import { useAppDispatch } from "@/lib/hooks";
import { deleteActivity } from "@/services/operations/activity.services";
import { HistoryOutlined } from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  Empty,
  Flex,
  Table,
  TableProps,
  Tag,
} from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

type MetricValue = string | number | string[];

interface DataType {
  key: string;
  activity: string;
  additionalMetrics: Record<string, MetricValue>;
  date: string;
  duration: string;
  calories: string;
}

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

const formatMetricName = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim();

const DashboardTable = ({
  isActivities = false,
  activityData,
  activityLoading,
  onActivityDeleted,
}: {
  isActivities: boolean;
  activityData: ActivityResponse[];
  activityLoading: boolean;
  onActivityDeleted?: () => void;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const colums: TableProps<DataType>["columns"] = [
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
      width: 128,
      render: (_, { activity }) => {
        let color = "";
        if (activity === "RUNNING") color = "magenta";
        if (activity === "WALKING") color = "red";
        if (activity === "CYCLING") color = "volcano";
        if (activity === "SWIMMING") color = "orange";
        if (activity === "WEIGHT_TRAINING") color = "gold";
        if (activity === "YOGA") color = "lime";
        if (activity === "HIIT") color = "green";
        if (activity === "CARDIO") color = "cyan";
        if (activity === "STRETCHING") color = "blue";

        return (
          <Flex gap="small" align="center">
            {
              <Tag
                style={{
                  borderRadius: 100,
                  backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`,
                }}
                color={color}
                key={activity}
                variant="filled"
              >
                {activity?.toUpperCase()}
              </Tag>
            }
          </Flex>
        );
      },
    },
    {
      title: "Additional Metrics",
      dataIndex: "additionalMetrics",
      key: "additionalMetrics",
      width: 240,
      render: (metrics: DataType["additionalMetrics"]) => {
        const entries = Object.entries(metrics ?? {});

        if (entries.length === 0) return "—";

        return (
          <Flex wrap gap="small" vertical>
            {entries.map(([name, value]) => (
              <span key={name}>
                <span className="text-teal-500 capitalize">
                  {formatMetricName(name)}:{" "}
                </span>
                {Array.isArray(value) ? value.join(", ") || "—" : value}
              </span>
            ))}
          </Flex>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: 100,
    },
    {
      title: "Calories",
      dataIndex: "calories",
      key: "calories",
      width: 100,
    },
    ...(isActivities
      ? [
          {
            title: "Action",
            key: "operation",
            //fixed: "end" as const,
            width: 72,
            render: (_: unknown, { key }: DataType) => (
              <AiOutlineDelete
                className="cursor-pointer text-xl text-red-500 hover:text-red-400 duration-200"
                onClick={() =>
                  dispatch(deleteActivity(key)).then((result) => {
                    if (result?.success) {
                      onActivityDeleted?.();
                    }
                  })
                }
              />
            ),
          },
        ]
      : []),
    {
      title: "More Info",
      key: "operation",
      width: 72,
      render: (_, { key }) => {
        return (
          <FaArrowCircleRight
            className="cursor-pointer text-xl hover:text-teal-300 duration-200 text-teal-500"
            onClick={() => router.push(`/activities/${key}`)}
          />
        );
      },
    },
  ];

  const dataSource: DataType[] =
    activityData?.map((activity) => ({
      key: activity?.id,
      activity: activity?.type,
      additionalMetrics: activity?.additionalMetrics,
      date: new Date(activity?.createdAt).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      duration: String(`${activity?.duration} min`),
      calories: String(activity?.caloriesBurned),
    })) ?? [];

  const emptyState = activityLoading ? (
    <div className="h-40" />
  ) : (
    <div className="flex h-40 items-center justify-center">
      <Empty description="No data" />
    </div>
  );

  return (
    <div className="w-full min-w-0 flex flex-col rounded-2xl border border-navy-700 bg-linear-to-b from-navy-900 to-navy-800 bg-navy-900 p-3 sm:p-5">
      {!isActivities && (
        <div className="w-full flex flex-col md:flex-row md:justify-between gap-2 md:gap-0">
          <div className="flex flex-row gap-4 items-center">
            <div className="w-12 h-12 self-start shadow-lg bg-slate-700/40 rounded-xl grid place-content-center">
              <HistoryOutlined
                className="text-2xl"
                style={{ color: "#14b8a6" }}
              />
            </div>
            <p className="text-neutral-200 font-medium text-lg">
              Recent Activities
            </p>
          </div>
          <Button className="self-end" href="/activities" type="link">
            {"View all ->"}
          </Button>
        </div>
      )}

      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "transparent",
            colorText: "#e2e8f0",
            colorTextDescription: "#e5e5e5",
            colorBorderSecondary: "transparent",
            colorFill: "#e5e5e5",
            colorFillTertiary: "#e5e5e5",
            colorFillQuaternary: "#e5e5e5",
          },
          components: {
            Pagination: {
              colorText: "#e5e5e5",
              colorTextDisabled: "#e5e5e5",
            },
            Table: {
              headerBg: "transparent",
              headerColor: "#e2e8f0",
              borderColor: "#122238",
              headerSplitColor: "#122238",
              rowHoverBg: "transparent",
              rowSelectedBg: "transparent",
              rowSelectedHoverBg: "transparent",
              headerSortActiveBg: "transparent",
              headerSortHoverBg: "transparent",
              bodySortBg: "transparent",
            },
          },
        }}
      >
        <div
          className={`w-full min-w-0 overflow-hidden ${
            isActivities ? "min-h-100" : ""
          }`}
        >
          <Table
            loading={activityLoading}
            dataSource={dataSource}
            columns={colums}
            scroll={{ x: "max-content" }}
            locale={isActivities ? { emptyText: emptyState } : undefined}
            pagination={{ pageSize: 5, hideOnSinglePage: true }}
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

export default DashboardTable;
