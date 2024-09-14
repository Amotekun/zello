import { ActivityItem } from "@/components/activity-item";
import { ActivityLog } from "@/types"
import { ActivityIcon } from "lucide-react"


interface ActivityProps {
    activityLog: ActivityLog[] | undefined;
}
export const Activity: React.FC<ActivityProps> = ({
    activityLog
}) => {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <ActivityIcon className="w-5 h-5 mt-0.5 text-neutral-700"/>
            <div className="">
                <p className="font-semibold text-neutral-700 mb-2">
                    Activity
                </p>
                <ol>
                    {activityLog?.map((item) => (
                        <ActivityItem 
                            key={item.id}
                            item={item}
                        />
                    ))}
                </ol>
            </div>
        </div>
    )
}