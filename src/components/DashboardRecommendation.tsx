import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUserRecommendations } from "@/services/operations/recommendation.service";
import { Button, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FaArrowUpLong } from "react-icons/fa6";
import { GoInfo, GoLightBulb } from "react-icons/go";
import { PiBrainDuotone } from "react-icons/pi";

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

const DashboardRecommendation = () => {
  const { authData } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [recommendationData, setRecommendationData] = useState<
    RecommendationResponse[]
  >([]);
  const [recommendationLoading, setRecommendationLoading] =
    useState<boolean>(true);

  const latestRecommendation = recommendationData.at(-1);
  const safetyLevel = latestRecommendation?.safety?.level?.toUpperCase();

  useEffect(() => {
    if (!authData) {
      return;
    }

    let isActive = true;

    dispatch(getUserRecommendations(authData?.id))
      .then((recommendationResponse) => {
        if (isActive) {
          setRecommendationData(recommendationResponse?.data ?? []);
        }
      })
      .finally(() => {
        setRecommendationLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [authData, dispatch]);
  return (
    <div className="w-full bg-linear-to-b from-navy-900 to-navy-800 flex flex-col justify-center gap-6 bg-navy-900 border border-navy-700 rounded-2xl p-5 pb-10">
      <div className="flex flex-col md:flex-row w-full gap-2 md:gap-0 md:justify-between">
        <div className="flex flex-row gap-2 items-center">
          <div className="w-13 h-13 self-start shadow-lg bg-slate-700/40 rounded-xl grid place-content-center">
            <PiBrainDuotone className="text-primary text-3xl" />
          </div>
          <p className="text-lg font-semibold">Your latest recommendation</p>
        </div>
        <Button className="self-end" href="/recommendations" type="link">
          {"View All Recommendations->"}
        </Button>
      </div>

      {!recommendationLoading ? (
        recommendationData.length === 0 ? (
          <div className="w-full text-center font-medium text-neutral-200 text-2xl">
            Log an activity to get started!
          </div>
        ) : (
          <div className="w-full flex p-2 flex-col lg:flex-row items-center gap-10">
            <div className="p-5 max-w-100 h-fit grid place-items-center text-neutral-100 border-l-6 rounded-2xl border-teal-500 bg-navy-800">
              {latestRecommendation?.recommendation}
            </div>

            <div className="outline outline-navy-700 w-full lg:w-0 lg:h-30"></div>

            <div className="flex flex-col gap-2">
              <p className="flex flex-row items-center gap-2 text-neutral-100">
                <FaArrowUpLong className="text-primary" />
                Improvements
              </p>
              <ul className="flex flex-col gap-2 text-sm">
                {latestRecommendation?.improvements.map((imp, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 rounded-lg border border-navy-700 bg-navy-800/70 px-3 py-2 text-neutral-200 leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="outline outline-navy-700 w-full lg:w-0 lg:h-30"></div>

            <div className="flex flex-col gap-2">
              <p className="flex flex-row items-center gap-2 text-neutral-100">
                <GoLightBulb className="text-primary" />
                Suggestions
              </p>
              <ul className="flex flex-col gap-2 text-sm">
                {latestRecommendation?.suggestions.map((sug, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 rounded-lg border border-navy-700 bg-navy-800/70 px-3 py-2 text-neutral-200 leading-relaxed"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="outline outline-navy-700 w-full lg:w-0 lg:h-30"></div>

            <div className="flex flex-col gap-4">
              {latestRecommendation?.safety ? (
                <div className="flex flex-col gap-2">
                  <p className="flex flex-row items-center gap-2 text-neutral-100">
                    <AiOutlineSafetyCertificate className="text-primary" />
                    Safety Tips
                  </p>
                  <ul className="flex flex-col gap-2 text-sm">
                    <li
                      className={`flex items-start gap-2 rounded-lg border border-navy-700 ${safetyLevel === "HIGH" ? "bg-red-500/40" : safetyLevel === "LOW" ? "bg-green-500/40" : "bg-amber-500/40"} px-3 py-2 text-neutral-200 leading-relaxed`}
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="w-60">
                        {latestRecommendation?.safety?.message}
                      </span>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="flex flex-row gap-4 rounded-2xl items-center p-5 bg-navy-800 border border-navy-700">
                  <GoInfo className="text-neutral-100 text-4xl" />
                  <p className="text-neutral-300">
                    No safety concerns detected. Keep following your plan and
                    listen to your body.
                  </p>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <Skeleton active className="invert" />
      )}
    </div>
  );
};

export default DashboardRecommendation;
