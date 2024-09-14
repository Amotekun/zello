import { Separator } from "@/components/ui/separator";
import { Info } from "../../_components/info";
import { ActivityList } from "./_components/activity-list";

interface ActivityProps {
    params: {workspaceSlug: string};
};

export default function Activity({
    params
}: ActivityProps) {
    return (
        <div className="w-full p-12">
            <Info params={params}/>
            <Separator className="my-2"/>
            <ActivityList params={params} />

        </div>
    )
}