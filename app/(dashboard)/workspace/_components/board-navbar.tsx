"use client"

import { BoardOptions } from "./board-options";
import { BoardTitleForm } from "./board-title-form";

interface BoardNavbarProps {
    params: {workspaceSlug: string, boardSlug: string};
};

export const BoardNavbar: React.FC<BoardNavbarProps>= ({ params }) => {
    return (
        <div className="fixed h-14 w-full flex z-[40] top-18 items-center px-6 gap-x-4 text-white bg-black/50 ">
            <BoardTitleForm params={params} />
            <div className="ml-auto">
                <BoardOptions params={params} />
            </div>
        </div>
    );
};