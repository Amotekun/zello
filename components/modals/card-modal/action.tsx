import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useCardDeleteMutation, useCardDuplicateMutation } from "@/redux/features/auth-api-slice";
import { closeModal } from "@/redux/features/card-modal-slice";
import { useAppDispatch } from "@/redux/hooks";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

interface ActionsProps {
    cardList: CardWithList | undefined;
}

export const Action: React.FC<ActionsProps> = ({ cardList }) => {
    const router = useRouter();
    const {workspaceSlug, boardSlug} = useParams();
    const {pending} = useFormStatus();
    const [cardDelete] = useCardDeleteMutation();
    const [cardDuplicate] = useCardDuplicateMutation();
    const dispatch = useAppDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal());
    };
    
    /* TODO: MAKE SURE TO ADD THE STATE TO CLOSE THE MODAL HERE  */

    console.log("CARD LIST MODAL DELETE", cardList?.id);
    console.log("LIST LIST MODAL DELETE", cardList?.list.id);

    const onDelete = async () => {
        try {
            const payload = await cardDelete({
                workspaceSlug,
                boardSlug,
                cardId: cardList?.id,
                listId: cardList?.list.id
            }).unwrap();
            console.log("CARD DELETE PAYLOAD", payload);
            toast({title: `${cardList?.title} deleted`});
            router.refresh();
            handleCloseModal()
        } catch (error) {
            console.log("ACTION CARD MODAL DELETE", error);
        };
    };

    const onCopy = async () => {
        try {
            const payload = await cardDuplicate({
                workspaceSlug,
                boardSlug,
                cardId: cardList?.id,
                listId: cardList?.list.id
            }).unwrap();

            console.log("CARD DUPLICATE PAYLOAD", payload);
            toast({title: `${cardList?.title} duplicated`});
            router.refresh();
            handleCloseModal()
        } catch (error) {
            console.error("ACTION CARD MODAL COPY", error)
        };
    };

    return (
        <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold">
                Actions
            </p>
            <Button
                onClick={onCopy}
                disabled={pending}
                variant="primary"
                className="w-full justify-start"
                size="inline"
            >
                <Copy className="h-4 w-4 mr-2"/>
                Copy
            </Button>
            <Button
                onClick={onDelete}
                disabled={pending}
                variant="destructive"
                className="w-full justify-start"
                size="inline"
            >
                <Trash className="w-4 h-4 mr-2"/>
                Delete
            </Button>
        </div>
    )
}