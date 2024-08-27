"use client"

import { useRetrieveWorkspaceBoardsQuery } from "@/redux/features/auth-api-slice";

interface BackgroundImageProps {
    params: {workspaceSlug: string, boardSlug: string};
    children: React.ReactNode;
    className?: string;
};


export const BackgroundImage: React.FC<BackgroundImageProps> = ({
    params,
    children,
    className
}) => {
    const {workspaceSlug, boardSlug} = params;

    const {data: board, error, isLoading} = useRetrieveWorkspaceBoardsQuery({
        workspaceSlug: workspaceSlug,
        boardSlug: boardSlug,
    })
    
    console.log("BOARD RESULT:", board); // Log the whole result
    console.log("Error:", error); // Log any errors
    console.log("Is Loading:", isLoading); // Check loading status 

    if (!board) return;

    
    return (
        <div
            className={`${className} relative min-h-screen w-full bg-no-repeat bg-center bg-cover -z-20`}
            style={{backgroundImage: `url(${board.image_full_url})`}}
        >
            {children}
        </div>
    )
}