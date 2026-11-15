import {
  GithubOutlined,
  InstagramOutlined,
  LinkedinFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = () => {
  const router = useRouter();

  return (
    <section className="w-full relative p-25">
      <div className="w-full h-full flex flex-col lg:flex-row gap-10 lg:gap-0 items-center justify-between">
        <div className="w-full flex flex-col items-center lg:items-start gap-4">
          <Image src="/fitness_logo.png" alt="logo" width={200} height={200} />
          <p className="text-neutral-500 font-medium text-center md:text-start">
            Smarter Fitness. Healthier You.
          </p>
          <div className="flex flex-row gap-3">
            <GithubOutlined
              onClick={() => router.push("https://www.github.com/D-a-k-s-h")}
              style={{ fontSize: 30, color: "#e2e8f0", cursor: "pointer" }}
            />
            <InstagramOutlined style={{ fontSize: 30, color: "#e2e8f0" }} />
            <YoutubeFilled style={{ fontSize: 35, color: "#e2e8f0" }} />
            <LinkedinFilled
              onClick={() =>
                router.push("https://www.linkedin.com/in/daksh-k-789083257")
              }
              style={{ fontSize: 30, color: "#e2e8f0", cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-10 md:gap-20 items-center justify-center lg:items-start text-center lg:text-left">
          <div className="flex flex-col gap-3 cursor-pointer">
            <p className="text-neutral-100">Product</p>
            <p
              onClick={() => router.push("#features")}
              className="text-neutral-500 hover:text-neutral-200"
            >
              Features
            </p>
            <p className="text-neutral-500 hover:text-neutral-200">Pricing</p>
            <p className="text-neutral-500 hover:text-neutral-200">FAQs</p>
          </div>
          <div className="flex flex-col gap-3 cursor-pointer">
            <p className="text-neutral-100">Company</p>
            <p
              onClick={() => router.push("#getstarted")}
              className="text-neutral-500 hover:text-neutral-200"
            >
              About Us
            </p>
            <p className="text-neutral-500 hover:text-neutral-200">Blog</p>
            <p className="text-neutral-500 hover:text-neutral-200">Contact</p>
          </div>
          <div className="flex flex-col gap-3 cursor-pointer">
            <p className="text-neutral-100">Legal</p>
            <p className="text-neutral-500 hover:text-neutral-200">
              Privacy Policy
            </p>
            <p className="text-neutral-500 hover:text-neutral-200">
              Terms of Service
            </p>
          </div>
        </div>
        <div className="w-full text-center lg:text-end text-neutral-400">
          &copy; 2026 FitMonolith. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default Footer;
