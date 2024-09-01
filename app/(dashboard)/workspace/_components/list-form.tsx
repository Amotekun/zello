"use client";

import { Plus, X } from "lucide-react"
import { ListWrapper } from "./list-wrapper"
import { useParams, useRouter } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useListMutation } from "@/redux/features/auth-api-slice";
import { toast } from "@/components/ui/use-toast";

export const ListForm = () => {
    const router = useRouter();
    const params = useParams();

    const {workspaceSlug, boardSlug} = params;

    console.log("LIST WORKSPACE FORM",workspaceSlug);
    console.log("LIST BOARD FORM",boardSlug);
  
    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const [isEditing, setIsEditing] = useState(false);

    const [list] = useListMutation();

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
          inputRef.current?.focus();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const escapeKeyDisable = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        };
    };

    useEventListener("keydown", escapeKeyDisable);
    useOnClickOutside(formRef, disableEditing);

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
            const payload = await list({
                title,
                slug,
                workspace_slug: workspaceSlug,
                board_slug: boardSlug
            }).unwrap();
            console.log("LIST CREATED", payload);
            toast({title: "List created"})
            router.refresh();
        } catch (error) {
            console.error("LIST FORM ERROR", error)
        } finally {
            disableEditing();
        }

    }

    if (isEditing) {
        return (
            <ListWrapper>
                <form 
                    action={onSubmit} 
                    ref={formRef} 
                    className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
                >
                    <FormInput 
                        id="title"
                        ref={inputRef}
                        name="title"
                        placeholder="Enter list title..."
                        className="w-full text-sm px-2 py-1 font-medium border-transparent hover:border-input focus:border-input transition "
                    />
                    <div className="flex items-center gap-x-1">
                        <Button 
                            type="submit"
                            className=""
                            variant="primary"
                            size="sm"
                        >
                            Add list
                        </Button>
                        <Button
                            onClick={disableEditing}
                            variant="secondary"
                            size="sm"

                        >
                            <X className="w-4 h-4"/>
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        );
      };
  
    return (
        <ListWrapper>
            <button
                onClick={enableEditing}
                className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
            >
                <Plus className="h-4 w-4 mr-2" />
                Add a list
            </button>
        </ListWrapper>
    )
}