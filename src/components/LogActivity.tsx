import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { saveActivity } from "@/services/operations/activity.services";
import {
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
import React, { useState } from "react";

interface FieldType {
  activityType: string;
  duration: number;
  startTime: string;
  endTime: string;
  calories: number;
  additionalMetrics: { metric: string; value: string }[];
}

const activityTypeOptions = [
  { label: "Running", value: "RUNNING" },
  { label: "Walking", value: "WALKING" },
  { label: "Cycling", value: "CYCLING" },
  { label: "Swimming", value: "SWIMMING" },
  { label: "Weight Training", value: "WEIGHT_TRAINING" },
  { label: "Yoga", value: "YOGA" },
  { label: "HIIT", value: "HIIT" },
  { label: "Cardio", value: "CARDIO" },
  { label: "Stetching", value: "STRETCHING" },
  { label: "Other", value: "OTHER" },
];

const LogActivity = ({ onActivitySaved }: { onActivitySaved?: () => void }) => {
  const { authData } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [saving, setSaving] = useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setSaving(true);

    if (!authData?.id) {
      setSaving(false);
      return;
    }

    const additionalMetrics = Object.fromEntries(
      (values.additionalMetrics ?? []).map(
        ({ metric, value }: { metric: string; value: string }) => [
          metric.trim(),
          value.trim(),
        ],
      ),
    );

    console.log({
      ...values,
      additionalMetrics,
      authData
    });

    dispatch(
      saveActivity(
        values?.activityType,
        additionalMetrics,
        values?.duration,
        values?.calories,
        values?.startTime,
        values?.endTime,
        authData?.id,
      ),
    )
      .then((result) => {
        if (result?.success) {
          form.resetFields();
          onActivitySaved?.();
        }
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return (
    <>
      <div className="w-full flex flex-row gap-4 items-center">
        <div className="w-12 h-12 self-start shadow-lg bg-teal-500 rounded-xl grid place-content-center">
          <PlusOutlined className="text-2xl" style={{ color: "#000" }} />
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-xl font-medium">Log New Activity</p>
          <p className="text-neutral-400 text-sm">
            Record your workout and keep your progress moving.
          </p>
        </div>
      </div>

      <Form
        className="activity-log-form"
        form={form}
        variant="filled"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          className="activity-form-label"
          label="Activity Type"
          name="activityType"
          rules={[{ required: true, message: "Activity type is required!" }]}
        >
          <Select
            className="activity-select"
            placeholder={<span className="text-neutral-200">Select Activity Type</span>}
            options={activityTypeOptions}
            style={{ color: "#e2e8f0", backgroundColor: "#334155" }}
          />
        </Form.Item>

        <Form.Item
          className="activity-form-label"
          label="Duration(min)"
          name="duration"
          rules={[{ required: true, message: "Duration is required!" }]}
        >
          <InputNumber
            color="#e2e8f0"
            style={{
              width: "100%",
              backgroundColor: "#64748b",
              color: "#e2e8f0",
            }}
          />
        </Form.Item>

        <div className="w-full flex flex-row gap-2">
          <Form.Item
            label="Start Date"
            name={"startTime"}
            className="activity-form-label w-full"
            rules={[{ required: true, message: "Start time is required!" }]}
          >
            <DatePicker
              showTime
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label="End Date"
            name={"endTime"}
            className="activity-form-label w-full"
            rules={[{ required: true, message: "End time is required!" }]}
          >
            <DatePicker
              showTime
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
        </div>

        <Form.Item
          className="activity-form-label"
          label="Calories(Kcal)"
          name="calories"
          rules={[{ required: true, message: "Calories is required!" }]}
        >
          <InputNumber
            color="#e2e8f0"
            style={{
              width: "100%",
              backgroundColor: "#64748b",
              color: "#e2e8f0",
            }}
          />
        </Form.Item>

        <Form.List name="additionalMetrics">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "metric"]}
                    rules={[{ required: true, message: "Metric is required!" }]}
                  >
                    <Input placeholder="Metric" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "value"]}
                    rules={[{ required: true, message: "Value is required!" }]}
                  >
                    <Input placeholder="Metric value" />
                  </Form.Item>
                  <MinusCircleOutlined
                    style={{ color: "#f1f5f9" }}
                    onClick={() => remove(name)}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Additional Metrics
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button
            className="w-full"
            color="cyan"
            style={{ color: "#000" }}
            variant="solid"
            icon={<SaveOutlined />}
            htmlType="submit"
            loading={saving}
          >
            Save Activity
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LogActivity;
