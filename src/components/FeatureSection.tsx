import { FastForwardFilled, SafetyOutlined, SignalFilled } from '@ant-design/icons';
import React from 'react'
import { FaRunning } from 'react-icons/fa';
import { Meteors } from './ui/MeteorsCard';
import { LuBrain } from 'react-icons/lu';

const FeatureSection = () => {
  return (
    <section
      className="w-full relative mx-0 my-10 md:my-25 lg:m-25"
      id="features"
    >
      <div className="w-full px-4 lg:px-20 flex flex-col text-center lg:text-left lg:flex-row gap-10 lg:gap-30 lg:justify-between items-center lg:items-start">
        <div className="flex flex-col gap-6">
          <p className="font-semibold text-teal-500 text-lg uppercase">
            Features
          </p>
          <p className="text-5xl md:text-6xl text-white font-extrabold">
            Everything you need for a <br></br> healthier you.
          </p>
          <p className="text-neutral-400">
            Fit monolith combines powerful tracking, intelligent <br></br>{" "}
            insights, and personalized guidance to help you <br></br> reach your
            goal.
          </p>
          <button className="cursor-pointer shadow-[0_0_0_3px_#000000_inset] px-8 py-3 bg-transparent outline-2 outline-teal-500 text-teal-300 rounded-full font-bold transform hover:-translate-y-1 transition duration-400">
            Learn more <FastForwardFilled color="#01344a" />
          </button>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:grid-rows-2 gap-4">
          <div className="w-full relative">
            <div className="relative w-full shadow-[-33px_0px_100px_0px_#2c5282,20px_0px_100px_0px_#319795] flex flex-col items-center md:items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-4 lg:px-4 lg:py-8">
              <div className="w-13 h-13 mb-3 shadow-lg bg-slate-700/40 rounded-xl grid place-content-center">
                <FaRunning className="text-primary text-3xl" />
              </div>

              <h1 className="relative z-50 mb-4 text-xl font-bold text-white">
                Track workouts and activities
              </h1>

              <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
                Log your workouts, track your steps, heart rate and more all in
                one place.
              </p>

              {/* Meaty part - Meteor effect */}
              <Meteors number={20} />
            </div>
          </div>
          <div className="relative w-full">
            <div className="relative flex w-full h-full flex-col items-center md:items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-4 lg:px-4 lg:py-8 shadow-[-33px_0px_100px_0px_#2c5282,20px_0px_100px_0px_#319795]">
              <div className="w-13 h-13 mb-3 shadow-lg bg-slate-700/40 rounded-xl grid place-content-center">
                <SignalFilled
                  className="text-3xl"
                  style={{ color: "#2dd4bf" }}
                />
              </div>

              <h1 className="relative z-50 mb-4 text-xl font-bold text-white">
                Analyze your progress
              </h1>

              <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
                Vizualize your performance with beautiful charts and insights.
              </p>

              {/* Meaty part - Meteor effect */}
              <Meteors number={20} />
            </div>
          </div>
          <div className="relative w-full">
            <div className="relative flex w-full h-full flex-col items-center md:items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-4 lg:px-4 lg:py-8 shadow-[-33px_0px_100px_0px_#2c5282,20px_0px_100px_0px_#319795]">
              <div className="w-13 h-13 mb-3 shadow-lg bg-slate-700/40 rounded-xl grid place-content-center">
                <LuBrain className="text-primary text-3xl" />
              </div>

              <h1 className="relative z-50 mb-4 text-xl font-bold text-white">
                AI Powered Recommendations
              </h1>

              <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
                Get personalized workout and nutrition suggestions based on your
                goals.
              </p>

              {/* Meaty part - Meteor effect */}
              <Meteors number={20} />
            </div>
          </div>
          <div className="relative w-full">
            <div className="relative w-full flex h-full flex-col items-center md:items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 p-4 lg:px-4 lg:py-8 shadow-[-33px_0px_100px_0px_#2c5282,20px_0px_100px_0px_#319795]">
              <div className="w-13 h-13 mb-3 shadow-lg bg-slate-700/40 rounded-xl grid place-content-center">
                <SafetyOutlined
                  className="text-3xl"
                  style={{ color: "#2dd4bf" }}
                />
              </div>

              <h1 className="relative z-50 mb-4 text-xl font-bold text-white">
                Recovery & Safety Insignts
              </h1>

              <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
                Monitor your recovery, avoid injuries and train smarter.
              </p>

              {/* Meaty part - Meteor effect */}
              <Meteors number={20} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureSection