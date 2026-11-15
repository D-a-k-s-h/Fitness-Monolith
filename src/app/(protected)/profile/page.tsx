"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
  Skeleton,
  Spin,
} from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FaFireAlt,
  FaPlus,
  FaRegCalendarCheck,
  FaRegUser,
  FaTrophy,
} from "react-icons/fa";
import { BsGenderAmbiguous } from "react-icons/bs";
import { MdOutlineEdit, MdOutlineMail } from "react-icons/md";
import { GiBodyHeight, GiRunningShoe, GiWeightScale } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { Meteors } from "@/components/ui/MeteorsCard";
import { PiLightningBold, PiTimerBold } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { SiGooglegemini } from "react-icons/si";
import { CiLogout } from "react-icons/ci";
import {
  deleteProfile,
  fetchProfile,
  updateProfile,
} from "@/services/operations/user.services";
import { formatDate } from "@/util/format-date";
import { getActivities } from "@/services/operations/activity.services";
import { LoadingOutlined } from "@ant-design/icons";

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

interface ProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
}

interface FieldType {
  age: number;
  gender: string;
  height: number;
  weight: number;
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
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData>();
  const [activityData, setActivityData] = useState<ActivityResponse[]>();
  const [activityLoading, setActivityLoading] = useState<boolean>(true);

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

  const initials = `${authData?.firstName.toUpperCase().at(0)}${authData?.lastName.toUpperCase().at(0)}`;

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setUpdating(true);

    dispatch(
      updateProfile(
        authData?.id,
        values?.age,
        values?.gender,
        values?.height,
        values?.weight,
      ),
    )
      .then(() => {
        router.refresh();
      })
      .finally(() => {
        setUpdating(false);
        setIsEditing(false);
      });
  };

  useEffect(() => {
    if (!authData) {
      return;
    }

    let isActive = true;

    dispatch(fetchProfile(authData?.id)).then((response) => {
      if (isActive) {
        setProfileData(response?.data);
      }
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
  }, [dispatch, authData, updating]);

  return (
    <div className="text-neutral-300 select-none flex flex-col min-h-screen w-full overflow-hidden bg-slate-950 font-sans dark:bg-black">
      <div className="w-full flex flex-col gap-5">
        <div className="w-full relative h-70 border-b-2 border-b-teal-700">
          <Image
            src="/profile-bg.png"
            alt="profile background"
            loading="lazy"
            className="object-cover w-full h-full"
            width={900}
            height={100}
          />

          {authData ? (
            <div className="w-full absolute inset-0 flex flex-col md:flex-row items-center gap-5 md:gap-10 p-10 md:p-15">
              <div className="bg-teal-400 text-xl md:text-6xl lg:text-8xl shadow-[0px_0px_49px_1px_#14b8a6] text-black w-13 h-20 md:w-40 md:h-30 lg:w-60 lg:h-50 rounded-full grid place-items-center outline-5 outline-teal-950">
                {initials}
              </div>
              <div className="w-full flex flex-col gap-5">
                <p className="w-full text-4xl lg:text-5xl text-neutral-100">
                  {authData?.firstName} {authData?.lastName}
                </p>
                <p className="w-full lg:text-lg flex flex-row items-center gap-4 text-neutral-300">
                  <span>Fitness Enthusiast</span>
                  <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                  <span>Keep Going!</span>
                </p>
                <p className="w-full flex flex-row gap-3 items-center">
                  <span className="h-4 outline-2 outline-teal-500"></span>{" "}
                  <span className="italic text-neutral-300">
                    &quot;Small steps everyday leads to big changes.&quot;
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <Skeleton active className="w-full absolute inset-0 invert p-15" />
          )}
        </div>
        <div className="flex flex-col lg:flex-row gap-5 p-5">
          <div className={`w-full ${isEditing ? 'h-155' : 'h-140'} md:h-120 relative border-navy-700 rounded-2xl`}>
            <Image
              src="/pro_tip_bg.png"
              alt="personal information bg"
              loading="lazy"
              className="w-full h-full object-cover rounded-2xl"
              width={1000}
              height={1000}
            />
            {!updating ? (
              <div className="w-full h-full absolute p-3 md:p-5 inset-0 flex flex-col gap-5">
                <div className="w-full flex flex-col md:flex-row justify-between">
                  <div className="w-full flex flex-row items-center gap-4">
                    <FaRegUser className="text-neutral-500 text-2xl" />
                    <p className="font-medium text-2xl text-neutral-100">
                      Personal Information
                    </p>
                  </div>
                  {isEditing ? (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="w-fit self-end flex flex-row gap-1 items-center shadow-[0_0_0_3px_#000000_inset] py-2 px-4 bg-teal-400 border border-teal-500 text-black rounded-full font-bold transform hover:-translate-y-1 transition duration-400"
                    >
                      <p>Cancel</p>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-fit self-end flex flex-row gap-2 items-center shadow-[0_0_0_3px_#000000_inset] py-2 px-4 bg-teal-400 border border-teal-500 text-black rounded-full font-bold transform hover:-translate-y-1 transition duration-400"
                    >
                      <MdOutlineEdit className="text-2xl" />
                      <p>
                        Edit<span className="text-teal-400">_</span>Profile
                      </p>
                    </button>
                  )}
                </div>
                {authData ? (
                  <div className="w-full h-full flex flex-row gap-3 md:gap-20 p-2">
                    <div className="h-full flex flex-col gap-4">
                      <div className="h-10 md:h-8 flex flex-row items-center gap-4">
                        <FaRegUser className="text-neutral-400" />
                        <p>Full Name</p>
                      </div>
                      <div className="h-10 flex flex-row items-center gap-4">
                        <MdOutlineMail className="text-neutral-400" />
                        <p>Email Address</p>
                      </div>
                      <div className="h-10 md:h-8 flex flex-row items-center gap-4">
                        <FaRegCalendarCheck className="text-neutral-400" />
                        <p>Member Since</p>
                      </div>
                      <div className="h-10 md:h-8 flex flex-row items-center gap-4">
                        <FaRegUser className="text-neutral-400" />
                        <p>Age</p>
                      </div>
                      <div className="h-10 md:h-8 flex flex-row items-center gap-3">
                        <BsGenderAmbiguous className="text-neutral-400 text-lg" />
                        <p>Gender</p>
                      </div>
                      <div className="h-10 md:h-8 flex flex-row items-center gap-3">
                        <GiBodyHeight className="text-neutral-400 text-lg" />
                        <p>Height (in cm)</p>
                      </div>
                      <div className="h-10 md:h-8 flex flex-row items-center gap-4">
                        <GiWeightScale className="text-neutral-400" />
                        <p>Weight (in kg)</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 text-neutral-100">
                      {authData && (
                        <>
                          <p className="h-10 md:h-8 flex items-center">
                            {authData?.firstName} {authData?.lastName}
                          </p>
                          <p className="h-10 md:h-8 flex items-center">
                            {authData?.email}
                          </p>
                          <p className="h-10 md:h-8 flex items-center">
                            {formatDate(authData?.createdAt)}
                          </p>
                        </>
                      )}
                      {isEditing ? (
                        <Form
                          variant="filled"
                          form={form}
                          layout="vertical"
                          className="flex flex-col gap-10"
                          onFinish={onFinish}
                        >
                          <Form.Item name="age" className="mb-0! h-5">
                            <InputNumber
                              placeholder="Enter age"
                              style={{
                                width: "100%",
                                backgroundColor: "#e2e8f0",
                              }}
                            />
                          </Form.Item>
                          <Form.Item name="gender" className="mb-0! h-5">
                            <Select
                              className="activity-select"
                              placeholder={
                                <span className="text-neutral-400">
                                  Select Gender
                                </span>
                              }
                              options={[
                                { value: "Male", label: "Male" },
                                { value: "Female", label: "Female" },
                                { value: "Others", label: "Others" },
                              ]}
                              style={{
                                backgroundColor: "#e2e8f0",
                              }}
                            />
                          </Form.Item>
                          <Form.Item name="height" className="mb-0! h-5">
                            <InputNumber
                              placeholder="Enter height"
                              style={{
                                width: "100%",
                                backgroundColor: "#e2e8f0",
                              }}
                            />
                          </Form.Item>
                          <Form.Item name="weight" className="mb-0! h-5">
                            <InputNumber
                              placeholder="Enter weight"
                              style={{
                                width: "100%",
                                backgroundColor: "#e2e8f0",
                              }}
                            />
                          </Form.Item>

                          <button
                            type="submit"
                            className="w-fit self-end flex flex-row gap-2 items-center shadow-[0_0_0_3px_#000000_inset] py-2 px-4 bg-teal-400 border border-teal-500 text-black rounded-full font-bold transform hover:-translate-y-1 transition duration-400"
                          >
                            Submit
                          </button>
                        </Form>
                      ) : (
                        <>
                          <p className="h-10 md:h-8 flex items-center">
                            {profileData?.age ?? authData?.age ?? 0}
                          </p>
                          <p className="h-10 md:h-8 flex items-center">
                            {profileData?.gender ?? authData?.gender ?? "null"}
                          </p>
                          <p className="h-10 md:h-8 flex items-center">
                            {profileData?.height ?? authData?.height ?? 0} cm
                          </p>
                          <p className="h-10 md:h-8 flex items-center">
                            {profileData?.weight ?? authData?.weight ?? 0} Kg
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <Skeleton active className="invert" />
                    <Skeleton active className="invert" />
                  </>
                )}
              </div>
            ) : (
              <Spin
                className="w-full h-full absolute inset-0 grid place-items-center"
                fullscreen
                description="Loading"
                size="large"
              >
                {content}
              </Spin>
            )}
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-4 p-5 bg-navy-900 border border-navy-800 rounded-2xl">
              <div className="w-full flex flex-row items-center gap-4">
                <IoStatsChart className="text-3xl text-teal-500" />
                <p className="text-2xl font-medium">Your Fitness Stats</p>
              </div>

              <div className="w-full flex flex-col md:flex-row gap-4">
                <div className="relative gradient-border-card w-full p-2 overflow-hidden bg-navy-800 border border-navy-700 rounded-2xl flex flex-col gap-2 items-center">
                  <Meteors number={20} />
                  <GiRunningShoe className="text-4xl text-teal-500" />
                  {!activityLoading ? (
                    <p className="text-2xl">{activityData?.length ?? 0}</p>
                  ) : (
                    <LoadingOutlined spin />
                  )}
                  <p>Total Activities</p>
                </div>
                <div className="relative gradient-border-card w-full p-2 overflow-hidden bg-navy-800 border border-navy-700 rounded-2xl flex flex-col gap-2 items-center">
                  <Meteors number={20} />
                  <PiTimerBold className="text-4xl text-teal-500" />
                  {!activityLoading ? (
                    <p className="text-2xl">{activeTime}</p>
                  ) : (
                    <LoadingOutlined spin />
                  )}
                  <p>Total Active Time</p>
                </div>
                <div className="relative gradient-border-card w-full p-2 overflow-hidden bg-navy-800 border border-navy-700 rounded-2xl flex flex-col gap-2 items-center">
                  <Meteors number={20} />
                  <FaFireAlt className="text-4xl text-red-600" />
                  {!activityLoading ? (
                    <p className="text-2xl">{totalCal} Kcal</p>
                  ) : (
                    <LoadingOutlined spin />
                  )}
                  <p>Total Calories</p>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-4 p-5 bg-navy-900 border border-navy-800 rounded-2xl">
              <div className="w-full flex flex-row items-center gap-4">
                <PiLightningBold className="text-3xl text-teal-500" />
                <p className="text-2xl font-medium">Quick Actions</p>
              </div>

              <div className="w-full flex flex-col md:flex-row gap-4">
                <div className="gradient-border-card w-full p-2 cursor-pointer hover:-translate-y-1 duration-300 bg-navy-800 border border-navy-700 rounded-2xl flex flex-col gap-3 items-center">
                  <FaRegUser
                    onClick={() => router.push("/dashboard")}
                    className="text-3xl text-teal-500"
                  />
                  <p>Dashboard</p>
                </div>
                <div className="gradient-border-card w-full p-2 cursor-pointer hover:-translate-y-1 duration-300 bg-navy-800 border border-navy-700 rounded-2xl flex flex-col gap-2 items-center">
                  <SiGooglegemini
                    onClick={() => router.push("/recommendations")}
                    className="text-4xl text-teal-500"
                  />
                  <p>Recommendations</p>
                </div>
                <div className="gradient-border-card w-full p-2 cursor-pointer hover:-translate-y-1 duration-300 bg-navy-800 border border-navy-700 rounded-2xl flex flex-col gap-2 items-center">
                  <FaPlus
                    onClick={() => router.push("/activities")}
                    className="text-4xl text-teal-500"
                  />
                  <p>Log Activity</p>
                </div>
                <div
                  onClick={() => {
                    dispatch(deleteProfile(authData?.id));
                    router.push("/");
                  }}
                  className="gradient-border-card w-full p-2 cursor-pointer hover:-translate-y-1 duration-300 bg-red-500/20 border border-red-700 rounded-2xl flex flex-col gap-2 items-center"
                >
                  <CiLogout className="text-4xl text-red-400" />
                  <p className="text-red-800">Delete Account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
