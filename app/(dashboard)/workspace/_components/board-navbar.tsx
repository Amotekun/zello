"use client"

import { BoardTitleForm } from "./board-title-form";

interface BoardNavbarProps {
    params: {workspaceSlug: string, boardSlug: string};
};

export const BoardNavbar: React.FC<BoardNavbarProps>= ({ params }) => {
    return (
        <div className="fixed w-full h-14 flex z-[40]">
            <BoardTitleForm params={params} />
            <div>
                
            </div>
        </div>
    );
};