import { Button } from "@/components/ui/button"
import Link from "next/link"

interface RedirectButtonProps {
    label: string;
    href: string;
}

export const RedirectButton: React.FC<RedirectButtonProps> = ({
    label,
    href
}) => {
    return (
        <Button
            variant="link"
            className='font-normal w-full'
            size="sm"
            asChild
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}