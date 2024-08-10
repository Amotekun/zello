"use client"

import { useForm } from "react-hook-form"
import { CardWrapper } from "./card-wrapper"
import { LoginSchema } from "@/schema"
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
import { useLoginMutation } from "@/redux/features/authApiSlice"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/redux/hooks"
import { setAuth } from "@/redux/features/authSlice"

export const LoginForm = () => {
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [login, {isLoading}] = useLoginMutation();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        try {
            console.log("Login VALUES", values);

            await login(values).unwrap();
            dispatch(setAuth(true));
            toast({
                title: "Login successful",
                variant: "default",
            })
            router.push('/')
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
        headLabel="Login"
        redirectButtonHref="/register"
        redirectButtonLabel="Create an account"
        showSocial
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
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
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full"
                    >
                        Login
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}