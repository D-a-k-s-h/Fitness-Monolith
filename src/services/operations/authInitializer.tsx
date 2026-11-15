"use client"

import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { setAuthData, setAuthInitialized, setToken } from "@/slices/authSlice";

export default function AuthInitializer() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = Cookies.get("access_token");
        const authData = Cookies.get("authData");
        
        if(token){
            dispatch(setToken(token));
        }

        if(authData){
            dispatch(setAuthData(JSON.parse(authData)));
        }

        dispatch(setAuthInitialized(true));
    }, [dispatch]);

    return null;
}