"use client";

import { Plus, X } from "lucide-react";
import { 
  forwardRef, 
  useRef, 
  ElementRef, 
  KeyboardEventHandler,
} from "react";
import { useParams } from "next/navigation";
import { useOnClickOutside, useEventListener } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { FormTextarea } from "@/components/form/form-textarea";
import { useCardsMutation } from "@/redux/features/auth-api-slice";
import { toast } from "@/components/ui/use-toast";

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
};

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
  listId,
  enableEditing,
  disableEditing,
  isEditing,
}, ref) => {
  console.log("listId", listId);
  const {workspaceSlug, boardSlug} = useParams();
  const formRef = useRef<ElementRef<"form">>(null);
  const [cards] = useCardsMutation();

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useOnClickOutside(formRef, disableEditing);
  useEventListener("keydown", onKeyDown);

  const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

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

    console.log("TITLE FROM FORMDATA:", title);

    try {
      const payload = await cards({
        workspaceSlug,
        boardSlug,
        title,
        slug,
        listId,
      }).unwrap();

      console.log("CARD CREATED", payload);
      toast({title: `${payload.title} created`});
    } catch (error) {
      console.error("CARD FORM ERROR", error)
    } finally {
      disableEditing();
    };
  };

  if (isEditing) {
    return (
      <form
        ref={formRef}
        action={onSubmit}
        className="m-1 py-0.5 px-1 space-y-4"
      >
        <FormTextarea
          id="title"
          onKeyDown={onTextareakeyDown}
          ref={ref}
          placeholder="Enter a title for this card..."
        />
        <div className="flex items-center gap-x-1">
            <Button
                type="submit"
                size="sm"
                variant="primary" 
            >
                Add Card
            </Button>
          <Button onClick={disableEditing} size="sm" variant="ghost">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </form>
    )
  };

  return (
    <div className="pt-2 px-2">
      <Button
        onClick={enableEditing}
        className="h-auto px-2 py-1.5 w-full justify-start text-white text-sm"
        size="sm"
        variant="ghost"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a card
      </Button>
    </div>
  );
});

CardForm.displayName = "CardForm";