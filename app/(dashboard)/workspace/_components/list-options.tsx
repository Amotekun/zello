"use client";


import { ElementRef, useRef } from "react";
import { MoreHorizontal, X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ListWithCards } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useDuplicateListMutation, useListDeleteMutation } from "@/redux/features/auth-api-slice";

interface ListOptionsProps {
  list: ListWithCards;
  onAddCard: () => void;
};

export const ListOptions: React.FC<ListOptionsProps> = ({
  list,
  onAddCard,
}) => {
    console.log("LIST OPTIONS PROPS CHECK:", list.id, " ", list.title);
    const {workspaceSlug, boardSlug} = useParams();
    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null);
    const [listDelete] = useListDeleteMutation();
    const [duplicateList] = useDuplicateListMutation();


  /*   const generateSlug = (title: string): string => {
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
            const payload = await listDelete({
                id: list.id,
                workspaceSlug,
                boardSlug
            }).unwrap();

            toast({title: "List deleted"})
            router.refresh();
        } catch (error) {
            console.error("LIST UPDATE HEADER ERROR", error)
        } 
    }
 */

  const onDelete = async () => {
    try {
        await listDelete({
            id: list.id,
            workspaceSlug,
            boardSlug
        }).unwrap();

        toast({title: "List deleted"})
        router.refresh();
        closeRef.current?.click();
    } catch (error) {
        console.error("LIST UPDATE HEADER ERROR", error)
    } 
  };

  const onCopy = async () => {
    try {
      const payload = await duplicateList({
        listId: list.id,
        workspaceSlug,
        boardSlug
      }).unwrap();
      toast({title: `Duplicated ${payload.title}`})
    } catch (error) {
        console.error("LIST UPDATE HEADER ERROR", error)
    }


  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className=" w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <Button
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy List
          </Button>
        </form>
        <Separator />
        <form
          action={onDelete}
        >
          <Button
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this list
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
