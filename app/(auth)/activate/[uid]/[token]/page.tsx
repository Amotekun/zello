"use client"

import { toast } from "@/components/ui/use-toast";
import { useActivationMutation } from "@/redux/features/auth-api-slice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ActivationPageProps {
    params: {
        uid: string;
        token: string;
    }
}

export default function ActivationPage({
    params
}: ActivationPageProps) {
    const router = useRouter();
    const [activation] = useActivationMutation()

    useEffect(() => {
        const {uid, token} = params;
        try {
            activation({uid, token}).unwrap();
            toast({
                title: "Account activated",
                variant: "default"
            })

        } catch (error) {
            console.error("Activation error", error);
            toast({
                title: "Activation error",
                variant: "destructive"
            })
        } finally {
            router.push("/login")
        }
    }, []);
    
    return (
        <div className="flex flex-col h-full text-center justify-center">
            <h1 className="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
                Activating your account...
            </h1>
        </div>
    )
}