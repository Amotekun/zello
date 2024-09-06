import { FormInput } from "@/components/form/form-input"
import { toast } from "@/components/ui/use-toast";
import { useListUpdateMutation } from "@/redux/features/auth-api-slice";
import { List, ListWithCards } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { ListOptions } from "./list-options";
import { ListWrapper } from "./list-wrapper";

interface ListHeaderProps {
    list: ListWithCards;
    onAddCard: () => void;
};

export const ListHeader: React.FC<ListHeaderProps> = ({
    list,
    onAddCard
}) => {
    const {workspaceSlug, boardSlug} = useParams();

    console.log("LIST WORKSPACE UPDATE:", workspaceSlug);
    console.log("LIST BOARD UPDATE UPDATE:", boardSlug);
    const router = useRouter();
    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(list.title);
    const [listUpdate] = useListUpdateMutation();

    const onBlur = () => {
        formRef.current?.requestSubmit();
    }

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const generateSlug = (title: string): string => {
        if (!title) return "";
        return title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+$/, '')
    }

    const onSubmit = async (formData: FormData) => {
        const title = formData.get("title") as string;
        const slug = generateSlug(title);

        console.log("TITLE FROM FORMDATA:", title);
        console.log("SLUG FROM FORMDATA:", slug);

        try {
            const payload = await listUpdate({
                id: list.id,
                title,
                slug,
                workspaceSlug,
                boardSlug
            }).unwrap();

            console.log("LIST UPDATE PAYLOAD:", payload)
            setTitle(payload.title);
            toast({title: "List updated"})
            router.refresh();
        } catch (error) {
            console.error("LIST UPDATE HEADER ERROR", error)
        } finally {
            disableEditing();
        }
    }

    
    return (
        <div  className="pt-2 px-2 flex items-start z-10  whitespace-nowrap font-semibold text-sm">
            {isEditing ? (
                <form 
                ref={formRef}
                action={onSubmit}
                className=""
                >
                    <FormInput 
                        ref={inputRef}
                        onBlur={onBlur}
                        id="title"
                        name="title"
                        placeholder="Enter list title.."
                        defaultValue={title}
                        className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
                        />
                </form>
            ): (
                <div
                onClick={enableEditing}
                className="w-full text-sm px-2.5 py-1 h-7 max-w-[300px] whitespace-pre-wrap break-words leading-tight  font-medium border-transparent"
                >
                    {title}
                </div>
            )}  
            <ListOptions 
                list={list}
                onAddCard={onAddCard}
            />  
        </div>
    )
}