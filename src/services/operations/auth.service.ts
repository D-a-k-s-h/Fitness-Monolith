import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { authEndpoint } from "../apis";
import type { AppDispatch } from "@/redux/store";
import { setAuthData, setIsSignUp, setToken } from "@/slices/authSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const { LOGIN_API, SIGNUP_API } = authEndpoint;

type AppRouter = ReturnType<typeof useRouter>;

export function login(email: string, password: string, router: AppRouter) {
  return async (dispatch: AppDispatch) => {
    const countdownDuration = 156;
    let secondsRemaining = countdownDuration;
    const toastId = toast.loading(
      `Authenticating... ${secondsRemaining}s remaining`,
    );
    const countdownInterval = setInterval(() => {
      secondsRemaining -= 1;

      if (secondsRemaining === 0) {
        clearInterval(countdownInterval);
        toast.loading("Still waiting for the server...", { id: toastId });
        return;
      }

      toast.loading(`Authenticating... ${secondsRemaining}s remaining`, {
        id: toastId,
      });
    }, 1000);

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN_RESPONSE -> ", response);

      if (!response?.data) {
        throw new Error(response.data?.message || "Invalid Credentials");
      }

      Cookies.set("access_token", response?.data?.token, {
        expires: 2, //TWO DAYS EXPIRY
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      Cookies.set("authData", JSON.stringify(response?.data?.user));

      toast.success(response?.data?.message ?? "Check!");
      dispatch(setToken(response?.data?.token));
      dispatch(setAuthData(response?.data?.user));
      router.replace("/dashboard");
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? (error?.response?.data?.message ?? error?.message)
          : "Authentication failed",
      );
      console.log(error);
    } finally {
      clearInterval(countdownInterval);
      toast.dismiss(toastId);
    }
  };
}

export function register(
  email: string,
  password: string,
  firstName: string,
  lastName?: string,
) {
  return async (dispatch: AppDispatch) => {
    const countdownDuration = 156;
    let secondsRemaining = countdownDuration;
    const toastId = toast.loading(
      `Registering... ${secondsRemaining}s remaining`,
    );
    const countdownInterval = setInterval(() => {
      secondsRemaining -= 1;

      if (secondsRemaining === 0) {
        clearInterval(countdownInterval);
        toast.loading("Still waiting for the server...", { id: toastId });
        return;
      }

      toast.loading(`Registering... ${secondsRemaining}s remaining`, {
        id: toastId,
      });
    }, 1000);

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
      });

      console.log("SIGNUP_RESPONSE -> ", response);

      if (!response?.data) {
        throw new Error(response.data?.message || "Registration failed");
      }

      toast.success("Welcome onboard!");
      dispatch(setIsSignUp(false));
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? (error?.response?.data?.message ?? error?.message)
          : "Registration Failed!",
      );
      console.error(error);
    } finally {
      clearInterval(countdownInterval);
      toast.dismiss(toastId);
    }
  };
}

export function logout(router: AppRouter) {
  return async (dispatch: AppDispatch) => {
    dispatch(setToken(null));
    dispatch(setIsSignUp(false));
    dispatch(setAuthData(null));
    Cookies.remove("access_token");
    toast.success("See You Around!");
    router.replace("/");
  };
}
