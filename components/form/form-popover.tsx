"use client";

import { 
    Popover, 
    PopoverClose, 
    PopoverContent, 
    PopoverTrigger 
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z  from "zod"
import { WorkspaceSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useWorkspaceMutation } from "@/redux/features/authApiSlice";
import { useRouter } from "next/navigation";
import { ComponentType, ElementRef, useRef } from "react";


interface FormPopoverProps {
    name: string;
    side?: "left" | "right" | "top" | "bottom";
    sideOffset?: number;
    variant?: "default" | "destructive" | "outline" | "primary" | "secondary" | "ghost";
    Icon?: ComponentType<React.SVGProps<SVGSVGElement>>;
}
export const FormPopover: React.FC<FormPopoverProps> = ({
    name,
    side = "bottom",
    sideOffset = 0,
    variant = "default",
    Icon
}) => {
    const [workspace] = useWorkspaceMutation();
    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null)

    const form = useForm<z.infer<typeof WorkspaceSchema>>({
        resolver: zodResolver(WorkspaceSchema),
        defaultValues: {
            title: "",
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

    const onSubmit = async (values: z.infer<typeof WorkspaceSchema>) => {
        try {
            const slug = generateSlug(values.title);
            const payload = await workspace({title: values.title, slug}).unwrap();
            console.log("WORKSPACE PAYLOAD", payload);
            toast({
                title: "Workspace created",
                variant: "default"
            })
            router.push(`/workspace/${payload.slug}`)
            closeRef.current?.click();
        } catch (error: any) {
            console.log("WORKSPACE ERROR", error);
            toast({
                title: "An error occured",
                variant: "destructive"
            })
        }
           
    }
    
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button 
                    variant={variant}
                > 
                    {name} 
                    {Icon && <Icon />}
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                side={side}
                sideOffset={sideOffset}
                className=""
            >
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
                        <FormField 
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
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
                            Create Workspace
                        </Button>
                    </form>
                </Form>
            </PopoverContent>
        </Popover>
    )
}