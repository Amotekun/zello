// components/AppInitializer.tsx
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuth, finishInitialLoad } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/hooks";

export const AppInitializer = () => {
    const dispatch = useDispatch();
    const { isLoading } = useAppSelector((state: RootState) => state.auth);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            dispatch(setAuth({ userToken: token }));
        }
        dispatch(finishInitialLoad());
    }, [dispatch]);

    if (isLoading) {
        // Optionally render a loading state here
        return <div>Loading...</div>;
    }

    return null; // No need to render anything
};
