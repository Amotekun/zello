"use client"

import { Logo } from "@/components/logo";
import { useAppSelector } from "@/redux/hooks";
import { Avatar } from "./avatar";
import { WorkspaceFormPopover } from "@/components/form/form-workspace-popover";
import { ChevronDown, Plus } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import { BoardFormPopover } from "@/components/form/form-board-popover";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
    const {isAuthenticated } = useAppSelector(state => state.auth);

    console.log("ISAUTHENTICATED", isAuthenticated);
    return (
        <nav className="fixed top-0 w-full py-3.5 px-2 border-b shadow-sm bg-white flex items-center">
            <MobileSidebar />
            <div className="md:px-7 md:mx-auto flex items-center w-full justify-between">
                <div className="flex items-center space-x-3">
                    <Logo/>
                    <WorkspaceFormPopover 
                        name="WorkSpace"
                        variant="ghost"
                        side="bottom"
                        sideOffset={12}
                        Icon={ChevronDown}
                        
                    />
                    <BoardFormPopover
                        side="bottom"
                    >
                        <Button 
                            variant="primary"
                            size="sm"
                            className="rounded-sm hidden md:block h-auto py-1.5 px-2"
                        >
                            Create
                        </Button>
                    </BoardFormPopover>
                    <BoardFormPopover
                        side="bottom"
                    >
                        <Button 
                            variant="primary"
                            size="sm"
                            className="rounded-sm md:hidden block h-auto py-1.5 px-2"
                        >
                            <Plus className="w-5 h-5" />
                        </Button>
                    </BoardFormPopover>
                </div>
                <div className="space-x-4 md:block md:w-auto flex items-center">
                    <Avatar />
                </div>
            </div>
        </nav>
    )
}