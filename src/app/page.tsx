"use client";

import FeatureSection from "@/components/FeatureSection";
import Footer from "@/components/Footer";
import GetStartedSection from "@/components/GetStartedSection";
import HomeSection from "@/components/HomeSection";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Image from "next/image";
import { MdOutlineDataThresholding } from "react-icons/md";

export default function Home() {
  return (
    <main className="w-full select-none flex flex-col flex-1 items-center justify-start bg-slate-950 font-sans">
      {/* HOME */}
      <HomeSection />

      {/* FEATURE SECTION */}
      <FeatureSection />

      {/* DEMO SECTION */}
      <div className="p-5 md:p-20 w-full flex flex-col lg:flex-row gap-10 lg:justify-between lg:gap-8">
        <Image
          src="/dashboard_design.png"
          alt="Demo ui dashboard"
          loading="lazy"
          className="object-contain"
          width={730}
          height={500}
        />

        <div className="w-full text-center lg:text-left flex flex-col items-center lg:items-start gap-10">
          <p className="text-teal-500 uppercase font-medium">Your Dashboard</p>
          <p className="text-5xl md:text-6xl text-white font-extrabold">
            See Your Progress in Real Time
          </p>
          <p className="text-neutral-400">
            Get a complete overview of your activity, performance and health
            metrics. Our intuitive dashboard helps you stay on track and
            motivated.
          </p>
          <BackgroundGradient className="px-4 py-2.5 flex font-medium gap-2 items-center">
            <MdOutlineDataThresholding className="text-3xl md:text-xl" />
            <span className="text-sm">
              Sample data shown for preview purpose only.
            </span>
          </BackgroundGradient>
        </div>
      </div>

      {/* GET STARTED SECTION */}
      <GetStartedSection />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
