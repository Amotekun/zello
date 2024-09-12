import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useCardUpdateMutation } from "@/redux/features/auth-api-slice";
import { CardWithList } from "@/types";
import { AlignLeft } from "lucide-react"
import { useParams, useRouter } from "next/navigation";
import { ElementRef, useRef, useState } from "react";


interface DescriptionProps {
    cardList: CardWithList | undefined;
}
export const Description: React.FC<DescriptionProps> = ({
    cardList
}) => {
    const router = useRouter();
    const {workspaceSlug, boardSlug} = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const textareaRef = useRef<ElementRef<"textarea">>(null);
    const [updateCard] = useCardUpdateMutation();

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        })
    };

    const disableEditing = () =>  {
        setIsEditing(false);
    }

    const onSubmit = async (formData: FormData) =>{
        const description = formData.get("description") as string;

        try {
            const payload = await updateCard({
                workspaceSlug,
                boardSlug,
                cardId: cardList?.id,
                listId: cardList?.list.id,
                description
            }).unwrap();

            console.log("UPDATED DESCRIPTION PAYLOAD: ", payload);
            toast({title: "Description updated"})
            router.refresh();
        } catch (error) {
            console.error("FAILED TO UPDATE DESCRIPTION ERROR: ", error);
        } finally {
            disableEditing();
        }
    }

    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="h-5 w-5 mt-0.5 text-neutral-700"/>
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Description
                </p>
                {isEditing ? (
                    <form 
                        action={onSubmit}
                        className="space-y-2"
                    >
                        <FormTextarea 
                            id="description"
                            placeholder="Add a more detailed description..."
                            defaultValue={cardList?.description}
                            ref={textareaRef}
                        />
                        <div className="mt-2 gap-x-2 items-center flex">
                            <Button
                                type="submit" 
                                size="sm"
                                variant="primary"
                            >
                                Save
                            </Button>
                            <Button 
                                type="button" 
                                onClick={disableEditing} 
                                size="sm" 
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ): (
                    <div
                        onClick={enableEditing}
                        className="cursor-pointer min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-4 rounded-md"
                        role="button"
                    >
                        {cardList?.description|| "Add a more detailed description..."}
                    </div>
                )}

            </div>
        </div>
    )
};