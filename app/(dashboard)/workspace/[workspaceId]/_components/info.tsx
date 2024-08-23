"use client";

import { getWorkSpaces } from "@/actions/useWorkspaces"
import { CreditCard, Layout } from "lucide-react"

interface InfoProps {
    params: {workspaceId: string};
};

export const Info: React.FC<InfoProps> = ({
    params
}) => {
    console.log("WORKSPACEID PARAMETER:", params.workspaceId)
    const { workspaces } = getWorkSpaces();

    const workspace =  workspaces.find(w => w.slug === params.workspaceId);

    
    return (
        <div className="flex items-center gap-x-4">
            <Layout className="w-10 h-10"/>
            <div className="space-y-1">
                <p className="font-semibold text-xl">
                    {workspace?.title}
                </p>
                <div className="flex items-center text-muted-foreground">
                    <CreditCard  className="h-3 w-3 mr-1"/>
                    {/* TODO: ADD A SUBSCRIPTION HERE LATER */}
                    free
                </div>
            </div>
        </div>
    );
};