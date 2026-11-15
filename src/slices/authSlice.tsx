import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthData {
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

interface AuthState {
  token: string | null;
  authData: AuthData | null;
  isSignUp: boolean;
  authInitialized: boolean;
}

const initialState: AuthState = {
  token: null,
  authData: null,
  isSignUp: false,
  authInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },
    setAuthData(state, value) {
      state.authData = value.payload;
    },
    setIsSignUp(state, value) {
      state.isSignUp = value.payload;
    },
    setAuthInitialized(state, action: PayloadAction<boolean>) {
      state.authInitialized = action.payload;
    },
  },
});

export const { setToken, setAuthData, setIsSignUp, setAuthInitialized } =
  authSlice.actions;
export default authSlice.reducer;
