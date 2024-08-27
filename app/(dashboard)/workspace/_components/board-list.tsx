"use client";

import { BoardFormPopover } from "@/components/form/form-board-popover";
import { Hint } from "@/components/hint";
import { useRetrieveBoardsQuery } from "@/redux/features/auth-api-slice";
import { HelpCircle, User2 } from "lucide-react"
import Link from "next/link";

interface BoardListParams {
    params: {workspaceSlug: string}
};

export const BoardList: React.FC<BoardListParams> = ({
    params
}) => {
    const {workspaceSlug} = params;

    console.log("WORKSPACE SLUG :", workspaceSlug);

    const {data: boards, error, isLoading} = useRetrieveBoardsQuery(workspaceSlug);

    console.log("error", error);
    console.log("isLoading", isLoading);
    console.log("boardList", boards);

    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className=""/>
                Your boards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {!!boards && boards.map((board) => (
                    <Link
                        key={board.id}
                        href={`/workspace/${workspaceSlug}/${board.slug}`}
                        className="relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
                        style={{backgroundImage: `url(${board.image_thumb_url})`}}
                    >
                        <div className="absolute bg-black/30 inset-0 group-hover:bg-black/40 transition">
                            <p className="relative font-semibold text-white">
                                {board.title}
                            </p>
                        </div>
                    </Link>
                ))}

                <BoardFormPopover
                    params={params}
                >
                    <div
                        role="button"
                        className="relative h-full aspect-video bg-muted rounded-sm flex flex-col gap-y-1 hover:opacity-75 p-2 transition"
                    >
                        <p className="text-sm">
                            Create new board
                        </p>
                        <span className="text-sm">
                            5 free boards
                            {/* TODO: ADD SUBSCRIPTION LATER */}
                        </span>
                        <Hint
                            sideOffset={40}
                            description="Create 5 new board to start adding tasks. Upgrade workspace for unlimited boards."
                        >
                            <HelpCircle 
                                className="absolute bottom-2 right-2 h-[14px] w-[14px]"
                            />
                        </Hint>
                    </div>
                </BoardFormPopover>
            </div>
        </div>
    );
};
