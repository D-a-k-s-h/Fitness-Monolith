import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { userEndpoint } from "../apis";
import axios from "axios";

const { UPDATE_PROFILE, DELETE_PROFILE, FETCH_PROFILE } = userEndpoint;

export function fetchProfile(id: string | undefined) {
  return async () => {
    const toastId = toast.loading("Fetching profile....");
    try {
      const response = await apiConnector("GET", `${FETCH_PROFILE}/${id}`);

      if (!response?.data) {
        throw new Error(response.data?.message || "Invalid Request");
      }

      console.log("FETCH_PROFILE_RESPONSE -> ", response);
      toast.dismiss(toastId);
      return { success: true, data: response?.data };
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? (error?.response?.data?.message ?? error?.message)
          : "Fetch Failed!",
      );
      console.log(error);
      toast.dismiss(toastId);
      return { success: false };
    }
  };
}

export function updateProfile(
  id: string | undefined,
  age: number,
  gender: string,
  height: number,
  weight: number,
) {
  return async () => {
    const toastId = toast.loading("Updating....");
    try {
      const response = await apiConnector("POST", UPDATE_PROFILE, {
        id,
        age,
        gender,
        height,
        weight,
      });

      if (!response?.data) {
        throw new Error(response.data?.message || "Invalid Request");
      }

      console.log("UPDATE_PROFILE_RESPONSE -> ", response);
      toast.dismiss(toastId);
      return { success: true };
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? (error?.response?.data?.message ?? error?.message)
          : "Update Failed!",
      );
      console.log(error);
      toast.dismiss(toastId);
      return { success: false };
    }
  };
}

export function deleteProfile(id: string | undefined) {
  return async () => {
    const toastId = toast.loading("Deleting profile....");
    try {
      const response = await apiConnector("DELETE", `${DELETE_PROFILE}/${id}`);

      if (!response?.data) {
        throw new Error(response.data?.message || "Invalid Request");
      }

      console.log("DELETE_PROFILE_RESPONSE -> ", response);
      toast.dismiss(toastId);
      return { success: true };
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? (error?.response?.data?.message ?? error?.message)
          : "Deletion Failed!",
      );
      console.log(error);
      toast.dismiss(toastId);
      return { success: false };
    }
  };
}
