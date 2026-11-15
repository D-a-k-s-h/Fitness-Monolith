"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { login, register } from "@/services/operations/auth.service";
import { setIsSignUp } from "@/slices/authSlice";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockFilled,
  MailFilled,
  UserOutlined,
} from "@ant-design/icons";
import { ConfigProvider, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiLock } from "react-icons/ci";

interface LoginFormData {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const dispatch = useAppDispatch();
  const { isSignUp } = useAppSelector((state) => state.auth);

  const submitHandler = async (data: LoginFormData) => {
    console.log(data);

    if (data.firstName || data.lastName || data.confirmPassword) {
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      await dispatch(
        register(data.email, data.password, data.firstName, data.lastName),
      );

      return;
    }

    await dispatch(login(data.email, data.password, router));
  };

  return (
    <div className="w-full h-full rounded-xl border border-navy-700 overflow-hidden bg-navy-900">
      <div
        className={`w-full h-full flex flex-col p-5 lg:px-10 lg:py-5 ${isSignUp ? "gap-5" : "gap-10"} items-center justify-center text-slate-100`}
      >
        <Image
          src="/fitness_logo.png"
          alt="logo"
          priority
          className="object-cover self-center"
          width={200}
          height={200}
        />

        <div className="w-full text-center">
          <p className="font-semibold text-2xl">
            {isSignUp ? "Welcome!" : "Welcome Back!"}
          </p>
          <p className="text-slate-400">
            {isSignUp
              ? "Signup to your fitness journey."
              : "Login to continue your fitness journey."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className={`w-full flex flex-col ${isSignUp ? "gap-4" : "gap-6"} `}
        >
          {isSignUp && (
            <div className="w-full flex flex-row gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName" className="text-slate-500">
                  First Name
                </label>
                <div className="w-full relative text-slate-200">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorTextPlaceholder: "#f1f5f9",
                        colorBgBase: "#122238",
                        colorText: "#f1f5f9",
                      },
                    }}
                  >
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          prefix={<UserOutlined />}
                          type="text"
                          placeholder="Enter first name"
                          required
                        />
                      )}
                    />
                  </ConfigProvider>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="lastName" className="text-slate-500">
                  Last Name
                </label>
                <div className="w-full relative text-slate-200">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorTextPlaceholder: "#f1f5f9",
                        colorBgBase: "#122238",
                        colorText: "#f1f5f9",
                      },
                    }}
                  >
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          prefix={<UserOutlined />}
                          type="text"
                          placeholder="Enter last name"
                        />
                      )}
                    />
                  </ConfigProvider>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-slate-500">
              Email address
            </label>
            <div className="w-full text-slate-200">
              <ConfigProvider
                theme={{
                  token: {
                    colorTextPlaceholder: "#f1f5f9",
                    colorBgBase: "#122238",
                    colorText: "#f1f5f9",
                  },
                }}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder={`${isSignUp ? "Enter your email" : "Enter registered email"}`}
                      required
                      prefix={<MailFilled />}
                    />
                  )}
                />
              </ConfigProvider>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-slate-500">
              Enter password
            </label>
            <div className="w-full relative text-slate-200">
              <ConfigProvider
                theme={{
                  token: {
                    colorTextPlaceholder: "#f1f5f9",
                    colorBgBase: "#122238",
                    colorText: "#f1f5f9",
                  },
                }}
              >
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      prefix={<LockFilled />}
                      minLength={6}
                      placeholder="Enter password"
                      required
                      iconRender={(visible) =>
                        visible ? (
                          <EyeTwoTone />
                        ) : (
                          <EyeInvisibleOutlined style={{ color: "#f1f5f9" }} />
                        )
                      }
                    />
                  )}
                />
              </ConfigProvider>
            </div>
          </div>

          {isSignUp && (
            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="text-slate-500">
                Confirm password
              </label>
              <div className="w-full relative text-slate-200">
                <CiLock className="absolute text-xl top-2.5 left-3" />
                <ConfigProvider
                  theme={{
                    token: {
                      colorTextPlaceholder: "#f1f5f9", // Blue placeholder
                      colorBgBase: "#122238",
                      colorText: "#f1f5f9",
                    },
                  }}
                >
                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <Input.Password
                        {...field}
                        prefix={<LockFilled />}
                        minLength={6}
                        placeholder="Confirm password"
                        required
                        iconRender={(visible) =>
                          visible ? (
                            <EyeTwoTone />
                          ) : (
                            <EyeInvisibleOutlined
                              style={{ color: "#f1f5f9" }}
                            />
                          )
                        }
                      />
                    )}
                  />
                </ConfigProvider>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="p-0.75 relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-linear-to-r from-primary to-primary-hover rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-md relative font-semibold text-md group transition duration-200 text-white hover:bg-transparent">
              {isSubmitting ? "Loading..." : isSignUp ? "Signup" : "Login"}
            </div>
          </button>

          <p className="text-center text-slate-200">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <span
              onClick={() => dispatch(setIsSignUp(!isSignUp))}
              className="cursor-pointer text-blue-400 underline"
            >
              {isSignUp ? "Login" : "Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
