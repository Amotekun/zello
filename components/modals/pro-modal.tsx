import { Dialog, DialogContent } from "@/components/ui/dialog"
import { closeModal } from "@/redux/features/pro-modal-slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { Button } from "../ui/button";
import { useStripeMutation } from "@/redux/features/auth-api-slice";
import { useParams } from "next/navigation";
import { toast } from "../ui/use-toast";

export const ProModal = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const {isOpen} = useAppSelector((state) => state.proModal);
    const [stripe] = useStripeMutation();

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const onCheckout = async () => {
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
        <Dialog
            open={isOpen}
            onOpenChange={handleCloseModal}
        >
            <DialogContent className="max-w-md p-0 overflow-hidden">
                <div className="aspect-video relative bg-slate-500 flex items-center justify-center">
                    <Image 
                        src="/images/upgrade.jpg"
                        alt="pro-modal"
                        className="object-cover"
                        fill
                    />
                </div>
                <div className="text-neutral-700 text-center mx-auto space-y-6 p-6">
                    <h2 className="font-semibold text-xl text-neutral-700">
                        Upgrade to Pro
                    </h2>
                    <p className="text-neutral-600">
                        Unlock all the features of Pro
                    </p>
                </div>
                <div className="flex p-3 justify-end gap-x-2">
                    <Button
                        onClick={onCheckout}
                        variant="primary"
                    >
                        Upgrade
                    </Button>
                    <Button
                        onClick={handleCloseModal}
                        variant="ghost"
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}