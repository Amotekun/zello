"use client"

import { Logo } from "@/components/logo";
import { useAppSelector } from "@/redux/hooks";
import { Avatar } from "./avatar";
import { FormPopover } from "@/components/form/form-popover";
import { ChevronDown } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
    const {isAuthenticated } = useAppSelector(state => state.auth);

    console.log("ISAUTHENTICATED", isAuthenticated);
    return (
        <nav className="fixed top-0 w-full py-3 px-2 border-b shadow-sm bg-white flex items-center">
            <MobileSidebar />
            <div className="md:max-w-screen-2xl md:mx-auto flex items-center w-full justify-between">
                <div className="flex items-center space-x-3">
                    <Logo/>
                    <FormPopover 
                        name="WorkSpace"
                        variant="ghost"
                        side="bottom"
                        sideOffset={12}
                        Icon={ChevronDown}
                        
                    />
                    <FormPopover 
                        name="Create"
                        variant="primary"
                    />
                </div>
                <div className="space-x-4 md:block md:w-auto flex items-center">
                    <Avatar />
                </div>
            </div>
        </nav>
    )
}