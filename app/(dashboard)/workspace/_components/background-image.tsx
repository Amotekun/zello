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
            className={`${className} fixed min-h-screen w-full bg-no-repeat bg-center bg-cover`} /* inset-0 */
            style={{
                backgroundImage: `url(${board.image_full_url})`,
               
            }}
        >
            {children}
        </div>
    )
}

/*  left: "3rem", 
                width: "calc(100% - 16rem)" */