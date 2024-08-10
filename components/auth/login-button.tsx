"use client"

import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode;
    asChild?: boolean;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
    children,
    asChild
}) => {
    const router  = useRouter();

    const onClick = () => {
        router.push("/login");
    }
    return (
        <div
            onClick={onClick}
            className="cursor-pointer"
        >
            {children}
        </div>
    )
}
