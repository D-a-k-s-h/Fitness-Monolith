"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getActivities } from "@/services/operations/activity.services";
import ActivitySummary from "@/components/ActivitySummary";
import DashboardTable from "@/components/DashboardTable";
import DashboardRecommendation from "@/components/DashboardRecommendation";

type MetricValue = string | number | string[];

interface ActivityResponse {
  id: string;
  type: string;
  additionalMetrics: Record<string, MetricValue>;
  userId: string;
  duration: number;
  caloriesBurned: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

const Page = () => {
  const { authData } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [activityData, setActivityData] = useState<ActivityResponse[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);

  const userInitials = `${authData?.firstName.charAt(0)}${authData?.lastName.charAt(0)}`;

  useEffect(() => {
    if (!authData) {
      return;
    }
    let isActive = true;

    dispatch(getActivities(authData?.id))
      .then((activitiesResponse) => {
        if (isActive) {
          setActivityData(activitiesResponse?.data ?? []);
        }
      })
      .finally(() => {
        if (isActive) {
          setActivityLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [dispatch, authData]);

  return (
    <div className="select-none pl-1 text-neutral-300 relative flex flex-col min-h-screen w-full overflow-hidden bg-slate-950 font-sans dark:bg-black">
      <div className="w-full flex justify-end items-center border-b border-navy-700 p-2 pr-5">
        <div className="flex flex-row gap-2">
          <p className="w-10 h-10 bg-navy-700 text-white rounded-full p-2 text-center">
            {userInitials}
          </p>
          <div className="w-full flex flex-col">
            <p className="font-semibold text-neutral-100">
              {authData?.firstName + " " + authData?.lastName}
            </p>
            <p className="text-xs text-neutral-300">{authData?.role}</p>
          </div>
        </div>
      </div>

      <div className="w-full pb-5 flex flex-col gap-2">
        {/* SECTION 1 */}
        <div className="w-full relative md:static h-40 bg-[#011122] flex flex-row md:justify-between">
          <div className="w-full absolute md:static inset-0 z-10 flex flex-col pl-4 items-start justify-center rounded-l-2xl gap-3">
            <p className="w-full text-neutral-400">Welcome Back,</p>
            <p className="w-full text-neutral-100 font-bold text-2xl">
              {authData?.firstName + " " + authData?.lastName}👋
            </p>
            <p className="w-full text-neutral-400">
              Keep pushing your limits. Every workout counts!
            </p>
          </div>
          <Image
            className="h-full relative md:static w-full object-cover"
            src="/first_card_bg_dashboard.png"
            alt="mountain hiker image"
            loading="eager"
            width={1000}
            height={100}
          />
        </div>

        {/* SECTION 2 */}
        <ActivitySummary
          activityData={activityData}
          activityLoading={activityLoading}
        />

        {/* SECTION 3 */}
        <DashboardTable
          isActivities={false}
          activityData={activityData.slice(0, 5)}
          activityLoading={activityLoading}
        />

        {/* SECTION 4 */}
        <DashboardRecommendation />
      </div>
    </div>
  );
};

export default Page;
