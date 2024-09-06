import { openModal } from "@/redux/features/card-modal-slice";
import { Card } from "@/types";
import { Draggable } from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

interface CardItemProps {
    listId: string;
    card: Card;
    index: number;
};

export const CardItem: React.FC<CardItemProps> = ({
    card,
    listId,
    index
}) => {
    const dispatch = useDispatch();

    const handleOpenModal = () => {
        dispatch(openModal({
            cardId: card.id,
            listId: listId,
        }));
    }

    
    return (
        <div
            onClick={(handleOpenModal)}
            className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
        >
            {card.title}
        </div>

    )
}