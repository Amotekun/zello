"use client";

import { getWorkSpaces } from "@/actions/use-workspaces"
import { useRetrieveCheckIsUpgradedQuery } from "@/redux/features/auth-api-slice";
import { CreditCard, Layout } from "lucide-react"

interface InfoProps {
    params: {workspaceSlug: string};
};

export const Info: React.FC<InfoProps> = ({
    params
}) => {
    const { workspaces } = getWorkSpaces();
    const {workspaceSlug} = params

    const { 
        data: isUpgraded,  
        error: isUpgradedError
    } = useRetrieveCheckIsUpgradedQuery(workspaceSlug);

    

    const workspace =  workspaces.find(w => w.slug === workspaceSlug);

    
    return (
        <div className="flex items-center gap-x-4">
            <Layout className="w-10 h-10"/>
            <div className="space-y-1">
                <p className="font-semibold text-xl">
                    {workspace?.title}
                </p>
                <div className="flex items-center text-muted-foreground">
                    <CreditCard  className="h-3 w-3 mr-1"/>
                    {isUpgraded ? "Upgraded" : "free plan"}
                </div>
            </div>
        </div>
    );
};