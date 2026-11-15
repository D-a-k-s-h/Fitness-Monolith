"use client";

import { Flex, Skeleton } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiCalendar, CiClock1 } from "react-icons/ci";
import { FaFireAlt } from "react-icons/fa";
import { GiLightningSlashes } from "react-icons/gi";
import { TiMediaFastForward } from "react-icons/ti";
import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getActivityData } from "@/services/operations/activity.services";
import { usePathname, useRouter } from "next/navigation";
import { IoIosTimer } from "react-icons/io";
import { ArrowLeftOutlined, EditFilled } from "@ant-design/icons";
import { PiBrainDuotone } from "react-icons/pi";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { FaArrowUpLong } from "react-icons/fa6";
import { GoLightBulb } from "react-icons/go";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { getActivityRecommendations } from "@/services/operations/recommendation.service";
import { formatDate, formatTime } from "@/util/format-date";

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

const formatMetricName = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();

const Page = () => {
  const { authData } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const path = usePathname();
  const router = useRouter();
  const activityId = path.split("/").at(-1);
  const [activityData, setActivityData] = useState<ActivityResponse>();
  const [recommendationData, setRecommendationData] =
    useState<RecommendationResponse>();

  const safetyLevel = recommendationData?.safety?.level.toUpperCase();

  const entries = Object.entries(activityData?.additionalMetrics ?? {});

  useEffect(() => {
    if (!authData) {
      return;
    }

    let isActive = true;

    dispatch(getActivityData(activityId)).then((activityResponse) => {
      if (isActive) {
        setActivityData(activityResponse?.data);
      }
    });

    dispatch(getActivityRecommendations(activityId)).then(
      (recommendationResponse) => {
        if (isActive) {
          setRecommendationData(recommendationResponse?.data.at(-1));
        }
      },
    );

    return () => {
      isActive = false;
    };
  }, [dispatch, authData, activityId]);

  return (
    <div className="text-neutral-300 relative flex flex-col min-h-screen w-full overflow-hidden bg-slate-950 font-sans">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full relative md:static h-[150] border border-navy-800 flex flex-row justify-between items-center bg-[#001429]">
          <div className="w-full absolute md:static z-10 inset-0 flex flex-row gap-4 px-2 items-center">
            <div className="w-15 h-15 self-start shadow-lg bg-slate-700/40 rounded-xl grid place-content-center">
              <GiLightningSlashes className="text-primary text-3xl" />
            </div>
            {activityData ? (
              <div className="w-full flex flex-col gap-2">
                <p className="capitalize text-2xl font-medium">
                  {activityData
                    ? formatMetricName(activityData?.type)
                    : "Undefined"}
                </p>
                {activityData && (
                  <Flex
                    gap="medium"
                    className="min-w-0 flex-wrap text-neutral-400"
                  >
                    <p className="flex shrink-0 flex-row items-center gap-2 whitespace-nowrap">
                      <CiCalendar />
                      <span>{formatDate(activityData?.createdAt)}</span>
                    </p>
                    <p className="flex shrink-0 flex-row items-center gap-2 whitespace-nowrap">
                      <CiClock1 />
                      <span>
                        {formatTime(activityData?.startTime).split(",").at(-1)}{" "}
                        - {formatTime(activityData?.endTime).split(",").at(-1)}
                      </span>
                    </p>
                    <p className="flex shrink-0 flex-row items-center gap-2 whitespace-nowrap">
                      <TiMediaFastForward />
                      <span>{activityData?.duration} minutes</span>
                    </p>
                    <p className="flex shrink-0 flex-row items-center gap-2 whitespace-nowrap">
                      <FaFireAlt />
                      <span>{activityData?.caloriesBurned} Kcal</span>
                    </p>
                  </Flex>
                )}
              </div>
            ) : (
              <Skeleton active className="invert" />
            )}
          </div>
          <Image
            src="/indivizual_actiivity_mountains.png"
            alt="mountains image"
            loading="eager"
            className="h-full w-full relative md:static object-cover"
            width={700}
            height={100}
          />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-2 p-2">
          <div className="w-full md:w-[65%] flex flex-col gap-4">
            {activityData ? (
              <Flex gap={"small"} wrap className="w-full">
                <div className="w-full md:w-[230] lg:w-[218] bg-linear-to-b from-navy-900 to-navy-700 p-5 bg-navy-900 border border-navy-700 rounded-2xl flex flex-col gap-4 items-center md:items-start">
                  <div className="w-15 h-15 rounded-full shadow-lg bg-slate-700/40 grid place-content-center">
                    <TiMediaFastForward className="text-primary text-3xl" />
                  </div>
                  <p className="text-neutral-400">Duration</p>
                  <p className="text-neutral-200 text-2xl font-medium">
                    {activityData?.duration} min
                  </p>
                </div>
                <div className="w-full md:w-[230] lg:w-[218] p-5 bg-navy-900 bg-linear-to-b from-navy-900 to-navy-700 border border-navy-700 rounded-2xl flex flex-col gap-4 items-center md:items-start">
                  <div className="w-15 h-15 rounded-full shadow-lg bg-slate-700/40 grid place-content-center">
                    <FaFireAlt className="text-primary text-3xl" />
                  </div>
                  <p className="text-neutral-400">Calories</p>
                  <p className="text-neutral-200 text-2xl font-medium">
                    {activityData?.caloriesBurned} Kcal
                  </p>
                </div>
                <div className="w-full md:w-[230] lg:w-[218] p-5 bg-navy-900 bg-linear-to-b from-navy-900 to-navy-700 border border-navy-700 rounded-2xl flex flex-col gap-4 items-center md:items-start">
                  <div className="w-15 h-15 rounded-full shadow-lg bg-slate-700/40 grid place-content-center">
                    <GiLightningSlashes className="text-primary text-3xl" />
                  </div>
                  <p className="text-neutral-400">Activity Type</p>
                  <p className="text-neutral-200 text-2xl font-medium capitalize">
                    {formatMetricName(activityData?.type).toLowerCase()}
                  </p>
                </div>
                <div className="w-full md:w-[230] lg:w-[218] p-5 bg-navy-900 bg-linear-to-b from-navy-900 to-navy-700 border border-navy-700 rounded-2xl flex flex-col gap-4 items-center md:items-start">
                  <div className="w-15 h-15 rounded-full shadow-lg bg-slate-700/40 grid place-content-center">
                    <CiCalendar className="text-primary text-3xl" />
                  </div>
                  <p className="text-neutral-400">Date & Time</p>
                  <p className="flex flex-col font-medium">
                    <span className="text-neutral-200 text-xl">
                      {formatDate(activityData?.createdAt)}
                    </span>
                    <span className="text-neutral-400">
                      {formatTime(activityData?.startTime).split(",").at(-1)} -{" "}
                      {formatTime(activityData?.endTime).split(",").at(-1)}
                    </span>
                  </p>
                </div>
              </Flex>
            ) : (
              <Skeleton active className="invert" />
            )}

            <div className="w-full bg-linear-to-b from-navy-900 to-navy-700 flex flex-col gap-5 bg-navy-900 rounded-2xl p-2 border border-navy-700">
              <div className="w-full flex flex-row justify-center gap-4 items-center border-b pb-3 border-b-navy-700">
                <div className="w-12 h-12 self-start rounded-full shadow-lg bg-slate-700/40 grid place-content-center">
                  <MdOutlineSignalCellularAlt className="text-primary text-3xl" />
                </div>
                <p className="text-neutral-200 text-xl font-medium">
                  Addtitional Metrics
                </p>
              </div>

              {activityData ? (
                <Flex
                  gap={"large"}
                  className="w-full flex flex-col items-center md:flex-row justify-around"
                >
                  {entries.reverse().map(([name, value], index) => (
                    <React.Fragment key={index}>
                      <div className="flex flex-col gap-4 capitalize">
                        <p className="text-neutral-400 font-normal text-lg">
                          {formatMetricName(name)}
                        </p>
                        <div className="text-lg">
                          {Array.isArray(value) ? (
                            value.length > 0 ? (
                              <ul className="list-disc list-inside">
                                {value.map((item, itemIndex) => (
                                  <li key={`${itemIndex}-${item}`}>{item}</li>
                                ))}
                              </ul>
                            ) : (
                              "—"
                            )
                          ) : (
                            value
                          )}
                        </div>
                      </div>
                      {index != entries.length - 1 && (
                        <div className="outline outline-navy-700"></div>
                      )}
                    </React.Fragment>
                  ))}
                </Flex>
              ) : (
                <Skeleton active className="invert" />
              )}
            </div>

            <div className="w-full bg-linear-to-b from-navy-900 to-navy-700 flex flex-col gap-5 bg-navy-900 rounded-2xl p-2 border border-navy-700">
              <div className="w-full flex flex-row justify-center gap-4 items-center border-b pb-3 border-b-navy-700">
                <div className="w-12 h-12 self-start rounded-full shadow-lg bg-slate-700/40 grid place-content-center">
                  <BiDetail className="text-primary text-3xl" />
                </div>
                <p className="text-neutral-200 text-xl font-medium">Details</p>
              </div>

              {activityData ? (
                <div className="w-full p-4 flex flex-row justify-between md:gap-20 lg:gap-35">
                  <div className="w-full flex flex-col gap-5">
                    <p className="text-neutral-400">Activity Type</p>
                    <p className="text-neutral-400">Duration</p>
                    <p className="text-neutral-400">Calories Burned</p>
                    <p className="text-neutral-400">Start Time</p>
                    <p className="text-neutral-400 pt-6 md:pt-0">End Time</p>
                  </div>
                  <div className="w-full flex flex-col gap-5">
                    <p className="text-neutral-200 capitalize">
                      {formatMetricName(activityData?.type).toLowerCase()}
                    </p>
                    <p className="text-neutral-200">
                      {activityData?.duration} minutes
                    </p>
                    <p className="text-neutral-200">
                      {activityData?.caloriesBurned} Kcal
                    </p>
                    <p className="text-neutral-200">
                      {formatDate(activityData?.startTime)} -{" "}
                      {formatTime(activityData?.startTime).split(",").at(-1)}
                    </p>
                    <p className="text-neutral-200">
                      {formatDate(activityData?.startTime)} -{" "}
                      {formatTime(activityData?.endTime).split(",").at(-1)}
                    </p>
                  </div>
                </div>
              ) : (
                <Skeleton active className="invert" />
              )}
            </div>

            <div className="w-full flex flex-row gap-4">
              <button
                onClick={() => router.back()}
                className="w-full relative inline-flex md:h-12 overflow-hidden rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl gap-2">
                  <ArrowLeftOutlined />
                  Back to Activities
                </span>
              </button>
              <button
                onClick={() => router.push("/activities")}
                className="w-full cursor-pointer px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500 flex flex-row gap-4 justify-center"
              >
                <EditFilled style={{ fontSize: 20 }} />
                Log new activity
              </button>
            </div>
          </div>

          <div className="w-full md:w-[35%] h-fit flex flex-col gap-4 bg-teal-500/20 border border-teal-600 rounded-2xl">
            <div className="flex flex-row items-center gap-4 rounded-t-2xl p-3">
              <div className="w-12 h-12 self-start rounded-full shadow-lg bg-slate-700/70 grid place-content-center">
                <PiBrainDuotone className="text-primary text-3xl" />
              </div>
              <div className="w-full flex flex-col gap-1">
                <p className="text-xl text-neutral-200">AI Recommendation</p>
                <p className="text-sm text-neutral-400">
                  Keep going! You&apos;re building a stronger you.
                </p>
              </div>
            </div>
            <div className="w-full text-neutral-400 font-normal items-start bg-linear-to-b from-navy-900 to-navy-700 rounded-t-2xl rounded-b-2xl flex flex-col gap-5 py-3 px-5">
              {recommendationData ? (
                <>
                  <div className="flex flex-col gap-3">
                    <BackgroundGradient
                      animate
                      className="uppercase px-4 py-2 text-xs font-medium text-neutral-50"
                    >
                      Performance
                    </BackgroundGradient>
                    <p>{recommendationData?.recommendation}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="flex flex-row text-primary text-lg items-center gap-2">
                      <FaArrowUpLong />
                      Improvements
                    </p>
                    <ul className="flex flex-col gap-2 text-sm">
                      {recommendationData?.improvements.map(
                        (imp: string, index) => (
                          <li
                            key={index}
                            className="flex items-start text-neutral-400 gap-2 rounded-lg border border-navy-700 bg-navy-800/70 px-3 py-2 leading-relaxed"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{imp}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3">
                    <p className="flex flex-row text-primary items-center text-lg gap-2">
                      <GoLightBulb />
                      Suggestions
                    </p>
                    <ul className="flex flex-col gap-2 text-sm">
                      {recommendationData?.suggestions.map((sug, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 rounded-lg border border-navy-700 bg-navy-800/70 px-3 py-2 text-neutral-400 leading-relaxed"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{sug}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-4">
                      <div className="flex flex-row items-center text-primary gap-2 text-lg font-normal">
                        <AiOutlineSafetyCertificate />
                        <p>Safety Tips</p>
                      </div>
                      <BackgroundGradient className="py-0.5 px-4 rounded-full text-neutral-50">
                        <p
                          className={`${safetyLevel == "LOW" ? "text-success" : safetyLevel == "HIGH" ? "text-red-500" : "text-yellow-500"}`}
                        >
                          Level:{" "}
                          <span className="capitalize">
                            {safetyLevel?.toLowerCase()}
                          </span>
                        </p>
                      </BackgroundGradient>
                    </div>
                    <ul className="flex flex-col gap-2 text-sm">
                      <li className="flex items-start gap-2 rounded-lg border border-navy-700 bg-navy-800/70 px-3 py-2 text-neutral-400 leading-relaxed">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{recommendationData?.safety?.message}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="w-full outline outline-neutral-500"></div>

                  <div className="w-full flex flex-row gap-2 md:gap-4 text-neutral-400">
                    <div className="w-full flex flex-row items-center gap-2">
                      <IoIosTimer className="text-xl" />
                      <p>
                        Generated on {formatDate(recommendationData?.createdAt)}
                      </p>
                    </div>
                    <div className="outline outline-neutral-500"></div>
                    <p className="w-full">
                      {formatTime(recommendationData?.createdAt)
                        .split(",")
                        .at(-1)}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Skeleton active className="invert" />
                  <Skeleton active className="invert" />
                  <Skeleton active className="invert" />
                  <Skeleton active className="invert" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
