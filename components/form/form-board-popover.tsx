"use client";

import { 
    Popover, 
    PopoverClose, 
    PopoverContent, 
    PopoverTrigger 
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z  from "zod"
import { BoardSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useBoardsMutation } from "@/redux/features/auth-api-slice";
import { useRouter } from "next/navigation";
import { ElementRef, useRef } from "react";
import { FormPicker } from "./form-picker";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { openModal } from "@/redux/features/pro-modal-slice";


interface BoardFormPopoverProps {
    params?: {workspaceSlug: string}
    side?: "left" | "right" | "top" | "bottom";
    sideOffset?: number;
    align?: "start" | "center" | "end";
    children: React.ReactNode;
    className?: string;
}
export const BoardFormPopover: React.FC<BoardFormPopoverProps> = ({
    side,
    sideOffset = 20,
    children,
    params,
    align,
    className,
}) => {
    const dispatch = useAppDispatch()
    const {isOpen} = useAppSelector((state) => state.proModal);

    const {workspaceSlug} = params || {};

    console.log("BOARD FORM POPPER", workspaceSlug);
    const [board] = useBoardsMutation();
    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null)

    const form = useForm<z.infer<typeof BoardSchema>>({
        resolver: zodResolver(BoardSchema),
        defaultValues: {
            title: "",
            image: ""
        }
    });

    const generateSlug = (title: string): string => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+$/, '')
    }

    const onSubmit = async (values: z.infer<typeof BoardSchema>) => {
        try {
            const {title, image} = values

            const [
                image_id,
                image_thumb_url,
                image_full_url,
                image_user_name,
                image_link_html
            ] = image.split("|").map(item => item.trim())

            const slug = generateSlug(title)

            await board({
                title,
                slug,
                image_id,
                image_thumb_url,
                image_full_url,
                image_user_name,
                image_link_html,
                workspace_slug: workspaceSlug,
            }).unwrap();

            toast({
                title: "Board created",
                variant: "default"
            })
         /*    router.push(`/boards/${payload.slug}`); */
            router.refresh();
            closeRef.current?.click();
        } catch (error: any) {
            const titleError = error.data?.title?.[0];
            const errorError = error?.data?.error;
            
            {errorError && dispatch(openModal())}
            toast({
                title: titleError || errorError,
                variant: "destructive"
            })
        }
           
    }
    
    return (
        <Popover >
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent 
                side={side}
                sideOffset={sideOffset}
                align={align}
                className={className}
            >
                <div className="text-sm font-medium text-neutral-600 pb-4">
                    Create board
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        variant="ghost"
                        className="absolute h-auto w-auto p-2  right-2 top-2 text-neutral-600"
                    >
                        <X className="w-4 h-4"/>
                    </Button>
                </PopoverClose>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormPicker 
                            id="image"
                            name="image"
                            control={form.control}
                        />
                        <FormField 
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Board Title</FormLabel>
                                    <FormControl>
                                        <Input 
                                            {...field}
                                            placeholder="Workspace title"
                                            
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type = "submit"
                            className="w-full mt-4"  
                        >
                            Create Board
                        </Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    );
};