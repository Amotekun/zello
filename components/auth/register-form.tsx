"use client"

import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { RegisterSchema } from "@/schema"
import { Input } from '@/components/ui/input'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z  from "zod"
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel 
} from '@/components/ui/form'
import { Button } from "../ui/button"
import { useRegisterMutation } from "@/redux/features/authApiSlice"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export const RegisterForm = () => {
    const { toast } = useToast();
    const router = useRouter();

    const [register, {isLoading}] = useRegisterMutation();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            re_password: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        try {
            console.log("REGISTER VALUES", values);

            await register(values).unwrap();
            toast({
                title: "Please check your email to verify account",
                variant: "default",
            })
            router.push('/login')
        } catch (error: any) {
            console.log("REGISTER ERROR", error);

            const errorMessages = error.data?.password || ["An error occured"]
            toast({
                title: errorMessages[0],
                variant: "destructive"
            });
        }
    };


    return (
        <CardWrapper
        headLabel="Create an account"
        redirectButtonHref="/login"
        redirectButtonLabel="Already have an account?"
        showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField 
                        control={form.control}
                        name="first_name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter first name"
                                        disabled={isLoading}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="last_name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter first name"
                                        disabled={isLoading}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter first name"
                                        disabled={isLoading}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="********"
                                        disabled={isLoading}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name="re_password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="********"
                                        disabled={isLoading}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                    >
                        Register
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}