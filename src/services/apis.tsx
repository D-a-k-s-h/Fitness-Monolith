const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const authEndpoint = {
  LOGIN_API: BASE_URL + "/auth/login",
  SIGNUP_API: BASE_URL + "/auth/register",
};

export const activityEndpoint = {
  GET_ACTIVITIES: BASE_URL + "/activities/retrieveActivity",
  SAVE_ACTIVITY: BASE_URL + "/activities/trackActivity",
  DELETE_ACTIVITY: BASE_URL + "/activities/deleteActivity",
  GET_ACTIVITY: BASE_URL + "/activities",
};

export const recommendationEndpoint = {
  GET_USER_RECOMMENDATION: BASE_URL + "/recommendation/user",
  GET_ACTIVITY_RECOMMENDATION: BASE_URL + "/recommendation/activity",
};

export const userEndpoint = {
  UPDATE_PROFILE: BASE_URL + "/auth/updateProfile",
  DELETE_PROFILE: BASE_URL + "/auth/deleteProfile",
  FETCH_PROFILE: BASE_URL + "/auth/fetchProfile"
};
