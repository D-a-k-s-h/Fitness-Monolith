"use client";

import LoginForm from "@/components/LoginForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaBrain, FaRunning } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";

const page = () => {
  return (
    <main className="relative select-none flex flex-col min-h-screen w-full overflow-hidden bg-slate-950 font-sans">
      <Image
        src="/login_bg.png"
        alt="login background"
        fill
        loading="lazy"
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 w-full flex flex-col gap-2 justify-center items-center">
        <Link
          href={"/"}
          className="w-full h-20"
        >
          <Image
            src="/fitness_logo.png"
            alt="logo"
            priority
            className="object-contain lg:px-10 lg:w-100 w-50 h-10"
            width={1000}
            height={200}
          />
        </Link>

        <div className="w-full relative flex flex-row lg:justify-between px-5 lg:pl-50 lg:pr-30">
          <div className="w-full hidden md:flex flex-col gap-10 items-start lg:px-20">
            <p className="font-bold text-shadow-md text-white text-4xl">
              Your Fitness Journey, <br></br>
              <span className="text-primary">Smarter</span>
            </p>
            <p className="text-slate-100 font-medium">
              Track your activities, get AI-powered recommendations,<br></br>{" "}
              and build healthier habits one step at a time.
            </p>
            <div className="self-end px-10 lg:px-40 flex flex-col justify-between gap-4">
              <div className="flex flex-row gap-4 items-center">
                <div className="w-13 h-13 shadow-lg bg-slate-700/40 rounded-xl grid place-content-center">
                  <FaRunning className="text-primary text-3xl" />
                </div>
                <div className="flex flex-col">
                  <p className="text-slate-100 font-semibold">Track</p>
                  <p className="w-35 text-xs text-slate-100">
                    Log your workouts and monitor your progress.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <div className="w-15 h-13 shadow-lg bg-slate-700/40 rounded-xl grid place-content-center">
                  <FaBrain className="text-purple-300 text-3xl" />
                </div>
                <div className="flex flex-col">
                  <p className="text-slate-100 font-semibold">
                    Get AI Recommendations
                  </p>
                  <p className="w-40 text-xs text-slate-300">
                    Personalized insights to improve your performance, form and
                    safety.
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-4 items-center">
                <div className="w-13 h-13 shadow-lg bg-slate-700/40 rounded-xl grid place-content-center">
                  <ImStatsBars className="text-blue-400 text-3xl" />
                </div>
                <div className="flex flex-col">
                  <p className="text-slate-100 font-semibold">
                    See Your Progress
                  </p>
                  <p className="w-35 text-xs text-slate-300">
                    Understand your trends and reach your goals.
                  </p>
                </div>
              </div>
            </div>
            <Image
              src="/slogan.png"
              alt="headline"
              loading="lazy"
              width={200}
              height={200}
            />
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default page;
