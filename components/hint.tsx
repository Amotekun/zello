import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"


interface HintProps {
    description: string;
    side?: "left" | "right" | "top" | "bottom";
    sideOffset?: number;
    children: React.ReactNode;
};

export const Hint: React.FC<HintProps> = ({
    description,
    side = "bottom",
    sideOffset = 0,
    children
}) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    sideOffset={sideOffset}
                    side={side}
                    className=""
                >
                    {description}
                </TooltipContent>

            </Tooltip>
        </TooltipProvider>
    )
}