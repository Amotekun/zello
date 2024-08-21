"use client";

import { 
    Dialog, 
    DialogContent, 
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel 
} from "@/components/ui/form";
import { WorkspaceSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import * as z  from "zod"
import { useWorkspaceMutation } from "@/redux/features/auth-api-slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeModal } from "@/redux/features/store-modal-slice";

export const FormModal = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.storeModal.isOpen)
    const router = useRouter();
    const [workspace] = useWorkspaceMutation();
    console.log("Modal is isOpen", isOpen);

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
            form.reset();
            dispatch(closeModal());    
            router.push(`/workspace/${payload.slug}`)
        } catch (error: any) {
            console.log("WORKSPACE ERROR", error);
            toast({
                title: "An error occured",
                variant: "destructive"
            })
        }
    };
    
    const onClose = (open: boolean) => {
        console.log("Dialog state detected, open:", open);
        if (!open) {
          dispatch(closeModal());
          console.log("Modal closed in redux");
        }
      };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> Create Workspace </DialogTitle>
                </DialogHeader>
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
            </DialogContent>            
        </Dialog>
    )
}