"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRetrieveCheckIsUpgradedQuery, useStripeMutation } from "@/redux/features/auth-api-slice";
import { closeModal } from "@/redux/features/pro-modal-slice";
import { toast } from "@/components/ui/use-toast";

interface SubscriptionButtonProps {
    params: {workspaceSlug: string};
};

export const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({ params }) => {
    const {workspaceSlug} = params;
    const dispatch = useAppDispatch();
    const {isOpen} = useAppSelector((state) => state.proModal);
    const [stripe] = useStripeMutation();

    const { data: isUpgraded, isLoading } = useRetrieveCheckIsUpgradedQuery(workspaceSlug);
    const handleCloseModal = () => {
        dispatch(closeModal());
    };


    const onClick = async () => {
        try {
            const payload = await stripe({
                workspaceSlug: params.workspaceSlug
            }).unwrap();

            window.location.href = payload.data
        } catch (error) {
            console.error("ERROR UPGRADING TO PRO:", error);
            toast({
                title: "Something went wrong",
                variant: "destructive"
            })
        } finally {
            handleCloseModal();
        };
    };


    return (
      <Button
        variant="primary"
        onClick={onClick}
        disabled={isLoading}
      >
        {isUpgraded ? "Manage subscription" : "Upgrade to pro"}
      </Button>
    )
};