import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { activityEndpoint } from "../apis";

const { GET_ACTIVITIES, SAVE_ACTIVITY, DELETE_ACTIVITY, GET_ACTIVITY } =
  activityEndpoint;

export function getActivities(userId: string) {
  return async () => {
    //const toastId = toast.loading("Fetching activities....");
    let result = null;
    try {
      const response = await apiConnector("GET", GET_ACTIVITIES, null, {
        "X-User-ID": userId,
      });

      if (!response?.data) {
        throw new Error(response.data?.message || "Invalid Request");
      }

      result = response;
    } catch (error) {
      toast.error(error instanceof Error ? error?.message : "Fetch Failed");
      console.log(error);
    }
    //toast.dismiss(toastId);
    return result;
  };
}

export function saveActivity(
  type: string,
  additionalMetrics: { [k: string]: string },
  duration: number,
  caloriesBurned: number,
  startTime: string,
  endTime: string,
  userId: string,
) {
  return async () => {
    const toastId = toast.loading("Saving activity....");
    const toastId2 = toast.loading("Generating Recommendation....");
    try {
      const response = await apiConnector("POST", SAVE_ACTIVITY, {
        type,
        additionalMetrics,
        duration,
        caloriesBurned,
        startTime,
        endTime,
        userId,
      });

      if (!response?.data) {
        throw new Error(response.data?.message || "Invalid Request");
      }

      console.log("SAVE_ACTIVITY_RESPONSE -> ", response);
      toast.dismiss(toastId);
      toast.dismiss(toastId2);
      return { success: true, data: response.data };
    } catch (error) {
      toast.error(error instanceof Error ? error?.message : "Fetch Failed");
      console.log(error);
      toast.dismiss(toastId);
      toast.dismiss(toastId2);
      return { success: false };
    }
  };
}

export function deleteActivity(activityId: string) {
  return async () => {
    const toastId = toast.loading("Deleting activity....");
    try {
      const response = await apiConnector(
        "DELETE",
        `${DELETE_ACTIVITY}/${activityId}`,
      );

      if (!response?.data) {
        throw new Error(response.data?.message || "Invalid Request");
      }

      console.log("DELETE_ACTIVITY_RESPONSE -> ", response);
      toast.dismiss(toastId);
      return { success: true };
    } catch (error) {
      toast.error(error instanceof Error ? error?.message : "Fetch Failed");
      console.log(error);
      toast.dismiss(toastId);
      return { success: false };
    }
  };
}

export function getActivityData(activityId: string | undefined) {
  return async () => {
    const toastId = toast.loading("Getting data....");
    try {
      const response = await apiConnector(
        "GET",
        `${GET_ACTIVITY}/${activityId}`,
      );

      if (!response?.data) {
        throw new Error(response.data?.message || "Invalid Request");
      }

      console.log("SAVE_ACTIVITY_RESPONSE -> ", response);
      toast.dismiss(toastId);
      return { success: true, data: response.data };
    } catch (error) {
      toast.error(error instanceof Error ? error?.message : "Fetch Failed");
      console.log(error);
      toast.dismiss(toastId);
      return { success: false };
    }
  };
}
