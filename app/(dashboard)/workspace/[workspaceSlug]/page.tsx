import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";
import { BoardList } from "../_components/board-list";

interface WorkspacePageProps {
    params: {workspaceSlug: string}
};

export default function WorkspacePage({
    params
}: WorkspacePageProps) {
    return (
        <div className="p-9">
            <Info 
                params={params}
            />
            <Separator className="my-4"/>
            <div>
                <BoardList 
                    params={params}
                />
            </div>
        </div>
    )
}