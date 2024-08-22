import { BoardFormPopover } from "@/components/form/board-form-popover";
import { Hint } from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react"

export const BoardList = () => {
    return (
        <div>
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className=""/>
                Your boards
            </div>
            <div>
                {}
                <BoardFormPopover>
                    <div
                        role="button"
                        className="relative h-full aspect-video bg-muted rounded-sm flex flex-col gap-y-1 hover:opacity-75 transition"
                    >
                        <p className="text-sm">
                            Create new board
                        </p>
                        <span>
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
