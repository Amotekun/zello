"use client"

import { useLogoutMutation } from "@/redux/features/authApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { LogOut } from "lucide-react";
import { logout as setLogout } from "@/redux/features/authSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Avatar = () => {
    const [logout] = useLogoutMutation();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            await logout(undefined).unwrap();
            dispatch(setLogout())
            router.push("/")
        } catch (error) {
            console.log("LOGOUT ERROR", error);
        }
    }

    return (
        <div className="flex items-center space-x-5">
            <div className="relative inline-block rounded-full overflow-hidden h-7 w-7 md:h-8 md:w-8">
                <Image 
                    src="/images/placeholder.jpg"
                    alt="avatar"
                    fill
                />
            </div>
            <div
                onClick={handleLogout}
                className="cursor-pointer"
            >
                <LogOut className="h-6 w-6"/>
            </div>
        </div>
    )
}