import { List } from "@/types"
import { Draggable } from "@hello-pangea/dnd";
import { ListHeader } from "./list-header";

interface ListItemProps {
    list: List;
    index: number;
};

export const ListItem: React.FC<ListItemProps> = ({
    list,
    index
}) => {
    const enableEditing = () => {
        
    }


    return (

                    <ListHeader 
                        onAddCard={enableEditing}
                        list={list}
                    />

    )
}