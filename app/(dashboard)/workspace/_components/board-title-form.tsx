import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast";
import { useBoardUpdateMutation, useRetrieveWorkspaceBoardsQuery } from "@/redux/features/auth-api-slice";
import { useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";

interface BoardTitleFormProps {
    params: {workspaceSlug: string, boardSlug: string};
};

export const BoardTitleForm: React.FC<BoardTitleFormProps> = ({ params }) => {
    const {workspaceSlug, boardSlug} = params;
    const router = useRouter();

    const {data: board} = useRetrieveWorkspaceBoardsQuery({
        workspaceSlug: workspaceSlug,
        boardSlug: boardSlug,
    })

    const formRef = useRef<ElementRef<"form">>(null)
    const inputRef = useRef<ElementRef<"input">>(null)

    const [title, setTitle] = useState(board?.title || "");
    const [isEditing, setIsEditing] = useState(false);

    const [boardUpdate] = useBoardUpdateMutation();

    useEffect(() => {
        if (board?.title) {
            setTitle(board.title)
        }
    }, [board])


    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
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
        setIsEditing(true);
        const title = formData.get("title") as string;

        console.log("TITLE FROM FORMDATA:", formData.get("title"));
        const slug = generateSlug(title);

        console.log("UPDATE TITLE:", title);
        console.log("UPDATE SLUG:", slug);

        try {
            const payload = await boardUpdate({
                title,
                slug,
                workspaceSlug,
                boardSlug,
            }).unwrap();
            toast({
                title: "Board title updated",
                variant: "default",
            });

            console.log("UPDATE BOARD PAYLOAD:", payload);

            setTitle(title);
            router.push(`/workspace/${workspaceSlug}/${payload.slug}`);
            router.refresh();
        } catch (error) {
            console.error("BOARD TITLE UPDATE ERROR: ", error);
        } finally {
            setIsEditing(false);
        };
    };

    const onBlur = () => {
        formRef.current?.requestSubmit();
    }

    if (isEditing) {
        return (
            <form 
                action={onSubmit}
                ref={formRef}
                className="flex items-center gap-x-2"    
            >
                <FormInput 
                    id="title"
                    name="title"
                    defaultValue={title}
                    ref={inputRef}
                    onBlur={onBlur}
                    className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
                />
            </form>
        )
    }



    if (!board) return;

    return (
        <Button
            onClick={enableEditing}
            variant="transparent"
            className="text-lg font-bold h-auto w-auto p-1 px-2"
        >
            {title}
        </Button>
    )
}