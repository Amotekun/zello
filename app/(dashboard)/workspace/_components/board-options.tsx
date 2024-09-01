import { Button } from "@/components/ui/button";
import { 
    Popover, 
    PopoverClose, 
    PopoverContent, 
    PopoverTrigger 
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useBoardDeleteMutation } from "@/redux/features/auth-api-slice";
import { MoreHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface BoardOptionsProps {
    params: {workspaceSlug: string, boardSlug: string};
};

export const BoardOptions: React.FC<BoardOptionsProps>= ({params}) => {
    const {workspaceSlug, boardSlug} = params;
    const router = useRouter();

    const [boardDelete] = useBoardDeleteMutation();

    const onDelete = async () => {
        try {
            await boardDelete({
                workspaceSlug, 
                boardSlug
            }).unwrap();

            console.log("DELETING THIS BOARD:", params);
            toast({
                title: "Board deleted...",
                variant: "default"
            })
            router.push(`/workspace/${workspaceSlug}`);
            router.refresh();
        } catch (error) {
            console.error("ERROR DELETING THIS BAORD:", error);
            toast({
                title: "Error deleting this board",
                variant: "default"
            })
        };
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="transparent"
                    className="h-auto w-auto p-2"
                >
                    <MoreHorizontal className="w-5 h-5"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="px-0 pt-3 pb-3"
                side="bottom"
                align="start"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Board Options
                </div>
                <PopoverClose>
                    <Button
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <Button
                    variant="ghost"
                    onClick={onDelete}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                >
                    Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    )
}