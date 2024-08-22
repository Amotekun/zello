import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";

interface WorkspacePageProps {
    params: {workspaceId: string}
};

export default function WorkspacePage({
    params
}: WorkspacePageProps) {
    return (
        <div className="">
            <Info 
                params={params}
            />
            <Separator className="my-4"/>
            <div>
                <BoardList />
            </div>
        </div>
    )
}