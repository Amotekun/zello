"use client"

import { useRetrieveWorkspaceBoardsQuery } from "@/redux/features/auth-api-slice";

interface BoardNavbarProps {
    params: {workspaceSlug: string, boardSlug: string};
};

export const BoardNavbar: React.FC<BoardNavbarProps>= ({ params }) => {
    const {workspaceSlug, boardSlug} = params;

    const {data: board, error, isLoading} = useRetrieveWorkspaceBoardsQuery({
        workspaceSlug: workspaceSlug,
        boardSlug: boardSlug,
    })

    if (!board) return;

    return (
        <div className="fixed">
            <div>
                
            </div>
        </div>
    );
};