import { LoadingOutlined, SignalFilled } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { FaRunning } from "react-icons/fa";

interface ActivityResponse {
  id: string;
  type: string;
  additionalMetrics: Record<string, unknown>;
  userId: string;
  duration: number;
  caloriesBurned: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

const ActivitySummary = ({
  activityData,
  activityLoading,
}: {
  activityData: ActivityResponse[];
  activityLoading: boolean;
}) => {
  // ACTIVE TIME BASED ON START TIME AND END TIME
  /*const totalDuration = activityData.reduce((total, activity) => {
    const start = new Date(activity?.startTime).getTime();
    const end = new Date(
      activity?.endTime ? activity?.endTime : activity?.createdAt,
    ).getTime();

    return total + (end - start);
  }, 0);

  const totalMinutes = Math.floor(totalDuration / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const activeTime = hours != 0 ? `${hours}h ${minutes}m` : `${minutes}m`;*/

  const totalDuration = activityData.reduce((total, activity) => {
    return total + activity?.duration;
  }, 0);

  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;

  const activeTime = hours != 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  const totalCalories = activityData.reduce((total, activity) => {
    return total + activity?.caloriesBurned;
  }, 0);

  return (
    <div className="w-full flex flex-col md:flex-row gap-2">
      <div className="w-full bg-linear-to-b from-navy-900 to-navy-800 flex flex-row gap-3 items-center justify-center border border-navy-800 bg-navy-900 p-8 rounded-2xl">
        <div className="w-15 h-15 self-start shadow-lg bg-slate-700/40 rounded-xl grid place-content-center">
          <FaRunning className="text-primary text-3xl" />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-neutral-100 font-medium text-lg">
            Log an activity
          </p>
          <p className="text-neutral-400 text-xs">
            Record your workout and keep your progress moving.
          </p>
          <Button
            style={{ backgroundColor: "#14b8a6", borderColor: "#14b8a6" }}
            variant="filled"
            href="/activities"
          >
            + Add Activity
          </Button>
        </div>
      </div>
      <div className="w-full p-4 bg-linear-to-b from-navy-900 to-navy-800 flex flex-col gap-2 justify-evenly items-center bg-navy-900 border border-navy-800 rounded-2xl">
        <div className="w-full flex flex-row gap-5 pl-5 items-center">
          <div className="w-13 h-13 self-start shadow-lg bg-slate-700/40 rounded-xl grid place-content-center">
            <SignalFilled className="text-3xl" style={{ color: "#14b8a6" }} />
          </div>

          <p className="text-lg text-neutral-100 font-medium">
            Your Activity Summary
          </p>
        </div>
        <div className="w-full flex flex-row justify-around">
          <div className="flex flex-col justify-center items-center">
            <p className="text-xl text-neutral-100 font-medium">
              {activityLoading ? (
                <LoadingOutlined spin />
              ) : (
                <span>{activityData.length}</span>
              )}
            </p>
            <p className="text-neutral-400">activities</p>
          </div>
          <div className="outline outline-navy-700"></div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-xl text-neutral-100 font-medium">
              {activityLoading ? <LoadingOutlined spin /> : activeTime}
            </p>
            <p className="text-neutral-400">active time</p>
          </div>
          <div className="outline outline-navy-700"></div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-xl text-neutral-100 font-medium">
              {activityLoading ? (
                <LoadingOutlined spin />
              ) : (
                `${totalCalories} kcal`
              )}
            </p>
            <p className="text-neutral-400">burned</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySummary;
