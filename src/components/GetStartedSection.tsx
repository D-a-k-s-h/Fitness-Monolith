"use client";

import { useAppDispatch } from "@/lib/hooks";
import { setIsSignUp } from "@/slices/authSlice";
import { ArrowRightOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const GetStartedSection = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <section className="w-full relative lg:h-150" id="getstarted">
      <Image
        src="/get_started_section_bg_image.png"
        alt="get started section bg"
        loading="lazy"
        fill
        className="object-cover"
        sizes="100vw"
      />

      <div className="relative m-25 lg:mt-30 text-center lg:text-left flex flex-col gap-10 justify-between lg:gap-0 lg:flex-row items-center">
        <div className="flex flex-col justify-center gap-4">
          <p className="uppercase font-semibold text-xl text-teal-500">
            Ready to get started?
          </p>
          <p className="font-extrabold text-5xl md:text-6xl text-neutral-100">
            Your Best Self <br></br> Is Just a Click Away
          </p>
          <p className="text-neutral-300 text-lg">
            Join FitMonolith today and start your journey towards <br></br> a
            healthier, stronger and happier you.
          </p>
          <div className="w-full flex flex-row justify-center items-center lg:justify-start gap-4">
            <button
              onClick={() => {
                dispatch(setIsSignUp(true));
                router.push("/auth");
              }}
              className="shadow-[0_0_0_3px_#000000_inset] px-8 py-3 bg-teal-400 border border-teal-500 text-black rounded-full font-bold transform hover:-translate-y-1 transition duration-400"
            >
              Get Started <ArrowRightOutlined />
            </button>
            <button
              onClick={() => router.push("/auth")}
              className="w-fit cursor-pointer shadow-[0_0_0_3px_#000000_inset] px-8 py-3 bg-transparent outline-2 outline-teal-500 text-teal-300 rounded-full font-bold transform hover:-translate-y-1 transition duration-400"
            >
              Log in
            </button>
          </div>
        </div>
        <div className="hidden text-lg mt-10 lg:flex flex-col gap-2 text-neutral-200">
          <p className="flex flex-row gap-2 items-center">
            <CheckCircleOutlined style={{ color: "#22c55e", fontSize: 25 }} />
            Free to get started
          </p>
          <p className="flex flex-row gap-2 items-center">
            <CheckCircleOutlined style={{ color: "#22c55e", fontSize: 25 }} />
            No payment required
          </p>
          <p className="flex flex-row gap-2 items-center">
            <CheckCircleOutlined style={{ color: "#22c55e", fontSize: 25 }} />
            Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
