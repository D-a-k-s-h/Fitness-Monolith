"use client";

import React from "react";
import {
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/ResizableNavbar";
import {
  ArrowRightOutlined,
  HeartFilled,
  SignalFilled,
  StarFilled,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setIsSignUp } from "@/slices/authSlice";
import { useAppDispatch } from "@/lib/hooks";

const HomeSection = () => {
  const navItems = [
    { name: "Home", link: "#home" },
    { name: "Features", link: "#features" },
    { name: "About", link: "#about" },
    { name: "Get Started", link: "#getstarted" },
  ];

  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <section className="w-full relative h-110 md:h-130 lg:h-183 grid" id="home">
      <Image
        src="/bg_first_section.png"
        alt="first section bg"
        fill
        loading="lazy"
        className="object-cover"
      />

      {/* NAVBAR */}
      <div className="w-full">
        <Navbar className="w-full flex flex-row">
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex flex-row items-center gap-4">
              <NavbarButton href="/auth" variant="secondary">
                Login
              </NavbarButton>
              <NavbarButton
                variant="primary"
                onClick={() => {
                  dispatch(setIsSignUp(true));
                  router.push("/auth");
                }}
              >
                Sign Up
              </NavbarButton>
            </div>
          </NavBody>
        </Navbar>
      </div>

      {/* HOME CONTENT */}
      <div className="absolute inset-0 flex flex-row justify-between items-start m-5 md:m-10 lg:mx-25 lg:mt-40">
        <div className="w-full text-center lg:text-left flex flex-col gap-4 md:gap-6 justify-center items-center lg:items-start">
          <div className="bg-[#01344a] rounded-full p-1 px-6">
            <p className="font-bold text-teal-400">
              Smarter Fitness. Healthier You.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-4xl md:text-6xl text-white font-extrabold">
              Your Fitness <br></br> Journey,{" "}
              <span className="text-teal-500">Smarter.</span>
            </p>
            <p className="text-sm md:text-base font-medium pt-4 md:pt-0 text-neutral-400">
              Track your workouts, analyze your progress, and get <br className="hidden md:block"></br> AI
              powered recommendations all in one place.
            </p>
          </div>

          <div className="w-full flex flex-row gap-5">
            <button
              onClick={() => router.push("/auth")}
              className="w-full text-xs md:text-base shadow-[0_0_0_3px_#000000_inset] p-2 md:px-8 md:py-3 bg-teal-400 border border-teal-500 text-black rounded-full font-bold transform hover:-translate-y-1 transition duration-400"
            >
              Get Started <ArrowRightOutlined />
            </button>
            <button
              onClick={() => router.push("#features")}
              className="w-full text-xs md:text-base shadow-[0_0_0_3px_#000000_inset] p-2 md:px-8 md:py-3 bg-transparent outline-2 outline-teal-500 text-teal-300 rounded-full font-bold transform hover:-translate-y-1 transition duration-400"
            >
              Explore Features
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex flex-row items-center gap-2">
              <SignalFilled
                style={{ color: "#2dd4bf" }}
                className="w-9 h-9 p-1 rounded-full grid place-content-center bg-[#01344a]"
              />
              <p className="font-medium text-neutral-300">Track Progress</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <StarFilled
                style={{ color: "#2dd4bf" }}
                className="w-9 h-9 grid place-content-center p-1 rounded-full bg-[#01344a]"
              />
              <p className="font-medium text-neutral-300">AI Recommendations</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <HeartFilled
                style={{ color: "#2dd4bf" }}
                className="w-9 grid place-content-center h-9 p-1 rounded-full bg-[#01344a]"
              />
              <p className="font-medium text-neutral-300">Better Health</p>
            </div>
          </div>
        </div>
        <div className="hidden w-full lg:flex justify-end gap-5">
          <div className="w-0.75 h-15 bg-teal-300 rounded-full"></div>
          <div className="flex flex-col gap-2 text-neutral-500 font-medium">
            <p className="text-shadow-2xs">Small steps.</p>
            <p className="text-shadow-2xs">Big results.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
