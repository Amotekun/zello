"use client";

import { ActivityItem } from "@/components/activity-item";
import { useRetrieveActivityLogQuery } from "@/redux/features/auth-api-slice"

interface ActivityListProps {
    params: {workspaceSlug: string};
};

export const ActivityList: React.FC<ActivityListProps> = ({params}) => {
    const {workspaceSlug} = params;

    const {data: activityLog } = useRetrieveActivityLogQuery({ workspaceSlug });
    
    return (
        <ol className="space-y-4 mt-4">
            {activityLog ? activityLog?.map((item) => (
                <ActivityItem 
                    key={item.id}
                    item={item}
                />
            )): (
                <p className="text-xs text-center text-muted-foreground">
                    No activity inside this organization
                </p>
            )}
        </ol>
    )
}