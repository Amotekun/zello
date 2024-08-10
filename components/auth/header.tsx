import { cn } from "@/lib/utils"
import { Poppins } from 'next/font/google';

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
})

interface HeaderProps {
    label: string;
}

export const Header: React.FC<HeaderProps> = ({
    label
}) => {
    return (
        <div className="flex items-center justify-center space-x-3">
            <h1 className={cn(
                "text-3xl font-semibold"
            )}>
                🔐
            </h1>
            <p className='text-muted-foreground text-sm'>
                {label}
            </p>
        </div>
    )
}