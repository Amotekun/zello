import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Header } from "@/components/auth/header"
import { Social } from "@/components/auth/social";
import { RedirectButton } from "@/components/auth/redirect-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headLabel: string;
    redirectButtonHref: string;
    redirectButtonLabel: string;
    showSocial?: boolean;

}

export const CardWrapper: React.FC<CardWrapperProps> = ({
    children,
    headLabel,
    redirectButtonHref,
    redirectButtonLabel,
    showSocial
}) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={headLabel}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                <RedirectButton 
                    href={redirectButtonHref}
                    label={redirectButtonLabel}
                />
            </CardFooter>

        </Card>
    )
}