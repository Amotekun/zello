import {format} from "date-fns"
import { ActivityLog } from "@/types";
import { Pencil } from "lucide-react";
import { logMessage } from "@/lib/auditlog-message";

interface ActivityItemProps {
    item: ActivityLog;
};

export const ActivityItem: React.FC<ActivityItemProps> = ({item}) => {
    return (
        <li className="flex items-center gap-x-2">
            <Pencil className="w-5 h-5 text-neutral-700"/>
            <div className="flex flex-col space-y-0.5">
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold lowercase text-neutral-700">
                        {item.user_name}
                    </span> {logMessage(item)}
                </p>
                <p className="text-xs text-muted-foreground">
                    {format(new Date(item.created_at), "MMM d, yyyy 'at' h:mm a")}
                </p>
            </div>
        </li>
    )
}