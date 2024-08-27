"use client"

import { useRetrieveWorkspaceBoardsQuery } from "@/redux/features/auth-api-slice";

export function getWorkspaceBoards(workspaceSlug: string, boardSlug: string) {
    const {data: board, error, isLoading} = useRetrieveWorkspaceBoardsQuery({
        workspaceSlug,
        boardSlug
    });

    return {
        board,
        error,
        isLoading
    }
}