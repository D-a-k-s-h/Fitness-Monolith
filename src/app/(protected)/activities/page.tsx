"use client";

import React, { useEffect, useState } from "react";
import { FaRunning } from "react-icons/fa";
import DashboardTable from "@/components/DashboardTable";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getActivities } from "@/services/operations/activity.services";
import LogActivity from "@/components/LogActivity";

const buttonText = [
  "All",
  "Running",
  "Walking",
  "Cycling",
  "Swimming",
  "Yoga",
  "Weight Training",
  "Cardio",
  "Stretching",
  "HIIT",
  "Other",
];

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
  const [activityType, setActivityType] = useState<string>("All");

  const dispatch = useAppDispatch();
  const [activityData, setActivityData] = useState<ActivityResponse[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);
  const [activityRefreshKey, setActivityRefreshKey] = useState(0);

  const filteredActivityData = activityData.filter(
    (activity) =>
      activity?.type == activityType.split(" ").join("_").toUpperCase(),
  );

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
  }, [dispatch, authData, activityRefreshKey]);

  return (
    <div className="text-neutral-300 relative flex flex-col min-h-screen w-full overflow-hidden bg-slate-950 font-sans dark:bg-black">
      <div className="w-full p-2 flex flex-col">
        <div className="w-full p-4 flex flex-row gap-4 items-center">
          <FaRunning className="text-primary text-5xl" />
          <div className="flex flex-col gap-1">
            <p className="text-3xl font-medium">Activities</p>
            <p className="text-neutral-400">
              Track your workouts, stay consistent and build healthier you.
            </p>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,2.2fr)_minmax(20rem,1fr)]">
          <div className="min-w-0 bg-linear-to-b from-navy-900 to-navy-800 bg-navy-900 p-5 flex flex-col items-center gap-4 rounded-2xl border border-navy-700">
            <div className="flex flex-wrap gap-3">
              {buttonText.map((text) => (
                <button
                  key={text}
                  type="button"
                  aria-pressed={activityType === text}
                  onClick={() => setActivityType(text)}
                  className={`group relative cursor-pointer isolate rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300 ${
                    activityType === text
                      ? "text-navy-950"
                      : "text-teal-300 hover:text-navy-950"
                  }`}
                >
                  <span
                    className={`absolute inset-0 -z-10 rounded-full bg-teal-400 transition-opacity duration-200 ${
                      activityType === text
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                    }`}
                  />
                  <span className="relative">{text}</span>
                </button>
              ))}
            </div>

            <DashboardTable
              isActivities={true}
              activityData={
                activityType == "All" ? activityData : filteredActivityData
              }
              activityLoading={activityLoading}
              onActivityDeleted={() =>
                setActivityRefreshKey((currentKey) => currentKey + 1)
              }
            />
          </div>

          <div className="min-w-0 bg-linear-to-b from-navy-900 to-navy-800 h-fit flex flex-col gap-7 bg-navy-900 rounded-2xl p-4 border border-navy-700">
            <LogActivity
              onActivitySaved={() =>
                setActivityRefreshKey((currentKey) => currentKey + 1)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
