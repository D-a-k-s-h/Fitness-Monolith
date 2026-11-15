"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { ArrowRightOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdAutoGraph } from "react-icons/md";
import { RiLightbulbAiFill } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import { FaFireAlt, FaRegClock, FaRunning } from "react-icons/fa";
import { AiOutlineBulb } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUserRecommendations } from "@/services/operations/recommendation.service";
import { Skeleton } from "antd";
import { formatDate } from "@/util/format-date";
import { getActivities } from "@/services/operations/activity.services";

const formatMetricName = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();

interface RecommendationResponse {
  id: string;
  type: string;
  recommendation: string;
  scope: string;
  improvements: string[];
  suggestions: string[];
  safety: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

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
  const router = useRouter();
  const [recommendationData, setRecommendationData] =
    useState<RecommendationResponse[]>();
  const [recommendationLoading, setRecommendationLoading] =
    useState<boolean>(true);
  const [activityLoading, setActivityLoading] = useState<boolean>(true);
  const [activityData, setActivityData] = useState<ActivityResponse[]>();

  const totalCal =
    activityData?.reduce((total, activity) => {
      return total + activity?.caloriesBurned;
    }, 0) ?? 0;

  const totalDuration =
    activityData?.reduce((total, activity) => {
      return total + activity?.duration;
    }, 0) ?? 0;

  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;

  const activeTime = hours != 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  const safetyLevel = (rec: RecommendationResponse) => {
    return rec?.safety?.level.toUpperCase();
  };

  useEffect(() => {
    if (!authData) {
      return;
    }

    let isActive = true;

    dispatch(getUserRecommendations(authData?.id))
      .then((response) => {
        if (isActive) {
          setRecommendationData(response?.data);
        }
      })
      .finally(() => {
        setRecommendationLoading(false);
      });

    dispatch(getActivities(authData?.id))
      .then((response) => {
        if (isActive) {
          setActivityData(response?.data);
        }
      })
      .finally(() => {
        setActivityLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [dispatch, authData]);

  return (
    <div className="text-neutral-300 flex flex-col select-none min-h-screen w-full bg-slate-950 font-sans dark:bg-black">
      <div className="w-full p-4 flex flex-col gap-5">
        <div className="flex flex-row gap-4">
          <div className="w-full flex flex-row gap-4 items-center">
            <div className="w-15 h-15 self-start shadow-lg bg-slate-700/40 rounded-xl grid place-content-center">
              <RiLightbulbAiFill className="text-primary text-5xl" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-3xl font-medium">Recommendations</p>
              <p className="text-neutral-400">
                Personalized insights to help you train smarter and stay
                healthier.
              </p>
            </div>
          </div>
        </div>

        <BackgroundBeamsWithCollision className="w-full relative outline-3 outline-teal-500 rounded-2xl">
          <Image
            src="/recommendationsPage_bg.png"
            alt="recommendation page bg"
            className="w-full h-40 object-cover rounded-2xl"
            loading="lazy"
            width={1000}
            height={60}
          />

          <div className="w-full absolute inset-0 p-6 flex flex-row justify-end md:justify-between lg:justify-end lg:gap-90 items-center">
            <div className="hidden md:flex flex-row gap-4 items-center">
              <MdAutoGraph className="text-primary text-5xl" />
              <div className="flex flex-col gap-1">
                <p className="text-2xl text-neutral-200 font-medium">
                  Keep up the great work!
                </p>
                <p className="text-neutral-300">
                  You&apos;re on track to achieve your fitness goals.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/activities")}
              className="h-fit rounded-2xl bg-transparent border-2 px-4 py-3 hover:bg-teal-500 hover:text-black duration-200 cursor-pointer border-teal-500 text-teal-500"
            >
              View Activity History <ArrowRightOutlined />
            </button>
          </div>
        </BackgroundBeamsWithCollision>

        <div className="w-full flex flex-col lg:flex-row gap-5">
          {recommendationData ? (
            <div className="w-full lg:w-[75%] grid grid-cols-1 md:grid-cols-2 gap-5 h-142 overflow-auto scroll-smooth scrollbar-none">
              {recommendationData?.map((rec, index) => (
                <div
                  key={rec.id || index}
                  className="group relative w-full overflow-auto scrollbar-none h-70 rounded-2xl border border-navy-700/80 bg-linear-to-br from-navy-800 via-navy-900 to-navy-950 p-5 shadow-[0_12px_30px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/40 hover:shadow-[0_18px_40px_rgba(20,184,166,0.12)]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-teal-400/70 to-transparent" />

                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400 ring-1 ring-teal-500/20">
                          <FaRegCircleCheck />
                        </div>
                        <span className="rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-400">
                          {formatMetricName(rec?.type)}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500">
                        {formatDate(rec?.createdAt)}
                      </p>
                    </div>

                    <p className="text-base leading-relaxed text-neutral-200">
                      {rec?.recommendation}
                    </p>

                    <div className="rounded-xl border border-white/10 bg-navy-950/40 p-4">
                      <p className="mb-3 flex items-center gap-2 font-medium text-teal-400">
                        <FaRegCircleCheck />
                        <span>Suggestions:</span>
                      </p>
                      <ul className="flex flex-col gap-2.5 text-sm">
                        {rec?.suggestions.map((sug, suggestionIndex) => (
                          <li
                            key={suggestionIndex}
                            className="flex items-start gap-3 text-neutral-400 leading-relaxed transition-colors group-hover:text-neutral-300"
                          >
                            <span className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                            <span>{sug}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-navy-950/40 p-4">
                      <p className="mb-3 flex items-center gap-2 font-medium text-teal-400">
                        <FaRegCircleCheck />
                        <span>Improvements:</span>
                      </p>
                      <ul className="flex flex-col gap-2.5 text-sm">
                        {rec?.improvements.map((imp, improvementIndex) => (
                          <li
                            key={improvementIndex}
                            className="flex items-start gap-3 text-neutral-400 leading-relaxed transition-colors group-hover:text-neutral-300"
                          >
                            <span className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className={`rounded-xl border border-white/10 ${safetyLevel(rec) == "LOW" ? "bg-green-950/40" : safetyLevel(rec) == "HIGH" ? "bg-red-950/40" : "bg-yellow-950/40"} p-4`}
                    >
                      <p className="mb-3 flex items-center gap-2 font-medium text-teal-400">
                        <FaRegCircleCheck />
                        <span>Safety:</span>
                      </p>
                      <p className="flex items-start gap-3 text-neutral-400 leading-relaxed transition-colors group-hover:text-neutral-300">
                        <span className="mt-1.75 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                        <span>{rec?.safety?.message}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            recommendationLoading && (
              <div className="w-full flex flex-col">
                <Skeleton active className="invert" />
                <Skeleton active className="invert" />
                <Skeleton active className="invert" />
              </div>
            )
          )}

          {activityData ? (
            <div className="w-full lg:w-[25%] flex flex-col gap-5">
              <div className="w-full flex flex-col bg-teal-900/50 rounded-2xl border-2 border-navy-800">
                <div className="w-full flex flex-row gap-4 items-center p-5 border-b border-b-navy-700">
                  <IoStatsChart className="text-3xl text-teal-500" />
                  <p className="font-medium text-xl text-neutral-200">
                    Your Fitness Journey
                  </p>
                </div>

                <div className="w-full flex flex-col rounded-b-2xl bg-linear-to-b from-navy-900 to-navy-800 px-5">
                  <div className="w-full p-4 flex flex-row gap-4 items-center justify-start">
                    <FaFireAlt className="text-red-700 text-3xl" />
                    <div className="flex flex-col gap-3">
                      <p className="text-xl font-medium">Total Calories</p>
                      <p className="text-neutral-400 text-lg">
                        {totalCal} Kcal
                      </p>
                    </div>
                  </div>
                  <div className="outline outline-navy-700"></div>
                  <div className="w-full p-4 flex flex-row gap-4 items-center justify-start">
                    <FaRegClock className="text-teal-500 text-3xl" />
                    <div className="flex flex-col gap-3">
                      <p className="text-xl font-medium">Total Active Time</p>
                      <p className="text-neutral-400 text-lg">{activeTime}</p>
                    </div>
                  </div>
                  <div className="outline outline-navy-700"></div>
                  <div className="w-full p-4 flex flex-row gap-3 items-center justify-start">
                    <FaRunning className="text-amber-600 text-4xl" />
                    <div className="flex flex-col gap-3">
                      <p className="text-xl font-medium">Total Activities</p>
                      <p className="text-neutral-400 text-lg">
                        {activityData?.length ?? 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full rounded-2xl relative outline-2 outline-navy-800">
                <Image
                  src="/pro_tip_bg.png"
                  alt="pro tip bg"
                  className="w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                  width={1000}
                  height={100}
                />

                <div className="w-full p-5 absolute inset-0 flex flex-col gap-3">
                  <div className="flex flex-row gap-3 items-center">
                    <AiOutlineBulb className="text-xl text-amber-400" />
                    <p className="text-teal-500 text-lg font-medium">Pro Tip</p>
                  </div>
                  <p className="text-neutral-300">
                    Try mixing different activities (running, strength,
                    training, yoga) for better overall fitness.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            activityLoading && (
              <div className="w-full flex flex-col">
                <Skeleton active className="invert" />
                <Skeleton active className="invert" />
                <Skeleton active className="invert" />
              </div>
            )
          )}

          {!recommendationLoading &&
            !activityLoading &&
            !recommendationData &&
            !activityData && (
              <div className="w-full text-center text-neutral-400 text-2xl font-medium pt-10">
                <p>No recommendations found.</p>
                <p>Log an activity to get started.</p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Page;
