"use client";

import {
  IconArrowLeft,
  IconBrandTabler,
  IconUserBolt,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";
import { PiMountainsLight } from "react-icons/pi";
import { RiGeminiFill } from "react-icons/ri";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { cn } from "@/lib/utils";
import { logout } from "@/services/operations/auth.service";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";

const CommonSidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-teal-500" />,
    },
    {
      label: "Activities",
      href: "/activities",
      icon: <IconUserBolt className="h-5 w-5 shrink-0 text-teal-500" />,
    },
    {
      label: "Recommendations",
      href: "/recommendations",
      icon: <RiGeminiFill className="h-5 w-5 shrink-0 text-teal-500" />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <IconUserBolt className="h-5 w-5 shrink-0 text-teal-500" />,
    },
    {
      label: "Logout",
      href: "/auth",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-teal-500" />,
      onClick: () => {
        dispatch(logout(router));
      },
    },
  ];

  return (
    <div
      className={cn(
        "select-none fixed z-40 top-0 left-0 flex max-w-7xl flex-1 flex-col overflow-hidden transition-[width] duration-300 md:flex-row md:w-15",
        open && "md:w-75",
        "h-screen", // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="w-full justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? (
              <Image
                src="/fitness_logo.png"
                alt="logo"
                loading="eager"
                width={250}
                height={50}
              />
            ) : (
              <LogoIcon />
            )}
            <div className="mt-8 flex flex-col gap-2 border-b border-neutral-700 pb-5">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          {open && (
            <div
              className={`${open && "transition duration-400"} w-full flex flex-col items-center gap-2`}
            >
              <Image
                src="/sidebar_mountains_bg.png"
                alt="sidebar mountains"
                loading="eager"
                width={200}
                height={200}
              />
              <div className="w-full flex flex-row justify-center gap-2 text-neutral-400 pl-4 text-xs font-semibold">
                <p>Stronger</p>
                <p>.</p>
                <p>Healthier</p>
                <p>.</p>
                <p>Happier</p>
              </div>
            </div>
          )}
        </SidebarBody>
      </Sidebar>
    </div>
  );
};

export default CommonSidebar;

export const LogoIcon = () => {
  return <PiMountainsLight className="text-2xl text-teal-400" />;
};
