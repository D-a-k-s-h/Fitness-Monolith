import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { recommendationEndpoint } from "../apis";

const { GET_USER_RECOMMENDATION, GET_ACTIVITY_RECOMMENDATION } =
  recommendationEndpoint;

export function getUserRecommendations(userId: string) {
  return async () => {
    const toastId = toast.loading("Fetching latest recommendation....");
    let result = null;
    try {
      const response = await apiConnector(
        "GET",
        `${GET_USER_RECOMMENDATION}/${userId}`,
      );

      if (!response?.data) {
        throw new Error(response.data?.message || "Invalid Request");
      }

      result = response;
    } catch (error) {
      toast.error(error instanceof Error ? error?.message : "Fetch Failed");
      console.log(error);
    }
    toast.dismiss(toastId);
    return result;
  };
}

export function getActivityRecommendations(activityId: string | undefined) {
  return async () => {
    const toastId = toast.loading("Fetching recommendations....");
    try {
      const response = await apiConnector(
        "GET",
        `${GET_ACTIVITY_RECOMMENDATION}/${activityId}`,
      );

      if (!response?.data) {
        throw new Error(response.data?.message || "Invalid Request");
      }

      console.log("GET_ACTIVITY_RECOMMENDATION_RESPONSE -> ", response);
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
