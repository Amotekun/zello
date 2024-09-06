"use client";

import { 
    Dialog, 
    DialogContent, 
    DialogTitle 
} from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Header } from "./header";
import { Description } from "./description";
import { closeModal } from "@/redux/features/card-modal-slice";
import { useParams } from "next/navigation";
import { useRetrieveCardQuery } from "@/redux/features/auth-api-slice";

export const CardModal = () => {
    const {workspaceSlug, boardSlug} = useParams();
    const dispatch = useAppDispatch();
    const {isOpen, cardId, listId} = useAppSelector((state) => state.cardModal)

    console.log("CARD MODAL IS OPEN", isOpen);

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const shouldFetch = isOpen && cardId && listId;

    const {data: cardList} = useRetrieveCardQuery({
        workspaceSlug,
        boardSlug,
        cardId: cardId,
        listId: listId
    }, {skip: !shouldFetch});

    console.log("CARD MODAL LIST WITH CARD AND LIST RELATED TOGETHER", cardList);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={handleCloseModal}
        >
            <DialogContent>
                <DialogTitle>{}</DialogTitle>
                <Header cardList={cardList}/>
                <Description />

            </DialogContent>

        </Dialog>
    )
}