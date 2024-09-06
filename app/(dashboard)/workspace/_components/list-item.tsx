import { List, ListWithCards } from "@/types"
import { Draggable } from "@hello-pangea/dnd";
import { ListHeader } from "./list-header";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./card-form";
import { CardItem } from "./card-item";
import { cn } from "@/lib/utils";

interface ListItemProps {
    list: ListWithCards;
    index: number;
};

export const ListItem: React.FC<ListItemProps> = ({
    list,
    index
}) => {
    console.log("LIST ITEM CARD ITEM CHECK FOR LIST.ID FOR CARD:", list.id, " ", list.title)
    const textareaRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    
    const enableEditing = () => {
        setIsEditing(true);
    };

    const disableEditing = () => {
        setIsEditing(false);
    };


    return (
        <li 
            className="shrink-0 h-full w-[272px] select-none"
        >
            <div 
                className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
            >
                <ListHeader 
                    onAddCard={enableEditing}
                    list={list}
                />
                <ol
                    className={cn(
                        "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                        list.cards.length > 0 ? "mt-2" : "mt-0"
                        )}
                    >
                    {list.cards.map((card, index) => (
                        <CardItem 
                        key={card.id}
                        index={index}
                        card={card}
                        listId={list.id}
                        />
                    ))}
                </ol>
                <CardForm
                    listId={list.id}
                    ref={textareaRef}
                    isEditing={isEditing}
                    enableEditing={enableEditing}
                    disableEditing = {disableEditing}
                />
            </div>
        </li>
    )
}