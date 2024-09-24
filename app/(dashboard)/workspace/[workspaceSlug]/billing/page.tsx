import { Separator } from "@/components/ui/separator";
import { Info } from "../../_components/info";
import { SubscriptionButton } from "./_components/subscription-button";


interface BillingProps {
    params: {workspaceSlug: string};
};

export default function Activity({
    params
}: BillingProps) {
    return (
        <div className="w-full p-12">
            <Info params={params}/>
            <Separator className="my-2"/>
            <SubscriptionButton params={params}/>
        </div>
    )
}