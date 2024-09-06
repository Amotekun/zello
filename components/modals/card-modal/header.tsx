import { FormInput } from "@/components/form/form-input";
import { toast } from "@/components/ui/use-toast";
import { useCardUpdateMutation } from "@/redux/features/auth-api-slice";
import { CardWithList } from "@/types"
import { Layout } from "lucide-react"
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";

interface HeaderProps {
    cardList: CardWithList | undefined;
};

export const Header: React.FC<HeaderProps> = ({cardList}) => {
    const {workspaceSlug, boardSlug} = useParams();
    const [title, setTitle] = useState(cardList?.title);
    const inputRef = useRef<ElementRef<"input">>(null);
    const [cardUpdate] = useCardUpdateMutation();

    const generateSlug = (title: string): string => {
        if (!title) return "";
        return title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+$/, '')
    };

    const onSubmit = async (formData: FormData) => {
        const title = formData.get("title") as string;
        const slug = generateSlug(title);

        try {
            const payload = await cardUpdate({
                workspaceSlug,
                boardSlug,
                cardId: cardList?.id,
                listId: cardList?.list.id,
                title,
                slug,
            }).unwrap();

            console.log("CARD UPDATE PAYLOAD", payload);
            toast({title: `${payload.title} updated`})
        } catch (error) {
            console.error("HEADER CARD MODAL ERROR",error);
        } finally {}
    }

    const onBlur = () => {
        inputRef.current?.form?.requestSubmit();
    }

    return (
        <div className="flex items-start gap-x-3 mb-6 w-full">
            <Layout className="h-5 w-5 mt-1 text-neutral-700"/>
            <div className="w-full">
                <form action={onSubmit}>
                    <FormInput 
                        id="title"
                        name="title"
                        ref={inputRef}
                        onBlur={onBlur}
                        placeholder="Enter a title for this card"
                        defaultValue={title}
                        className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"
                    />
                </form>
                <p className="text-sm text-muted-foreground">
                    In list <span className="underline">{cardList?.list.title}</span>
                </p>
            </div>
        </div>
    )
}