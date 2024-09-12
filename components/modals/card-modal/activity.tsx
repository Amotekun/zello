import { ActivityIcon } from "lucide-react"

export const Activity = () => {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <ActivityIcon className="w-5 h-5 mt-0.5 text-neutral-700"/>
            <div className="">
                <p className="font-semibold text-neutral-700 mb-2">
                    Activity
                </p>
                <ol>

                </ol>
            </div>
        </div>
    )
}