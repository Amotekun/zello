import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { closeSheet } from "@/redux/features/mobile-sidebar";

import { useAppDispatch } from "@/redux/hooks";
import { Workspaces } from "@/types";
import { 
    Activity, 
    CreditCard,
    Layout, 
    Pen
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";


interface SidebarItemsProps {
    isOpen: boolean,
    workspaces: Workspaces;
    onOpen: (id: string) => void; 
};

export const SidebarItems: React.FC<SidebarItemsProps> = ({
    isOpen,
    workspaces,
    onOpen,
}) => {
    const accordionItemRef = useRef<HTMLDivElement>(null); 
    const router = useRouter();
    const dispatch = useAppDispatch();

    const routes = [
        {
            label: "Boards",
            icon: <Layout />,
            href: `/workspace/${workspaces.slug}`
        },
        {
            label: "Activity",
            icon: <Activity />,
            href: `/workspace/${workspaces.slug}/activity`
        },
        /* TODO: ADD SETTINGS FEATURES */
        {
            label: "Billings",
            icon: <CreditCard />,
            href: `/workspace/${workspaces.slug}/billing`
        },
    ];

    const pushRef = (href: string) => {
        router.push(href); 
        dispatch(closeSheet());      
    }
/*  */
    return (
        <AccordionItem
            value={workspaces.id}
            className="border-none"
            ref={accordionItemRef}
        >
            <AccordionTrigger
                onClick={() => onOpen(workspaces.id)}
                className={cn(
                    "flex p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
                    !isOpen && "bg-sky-900/10 text-sky-700" 
                )}
            >
                <div className="flex items-center space-x-3">
                    <div>
                        <Pen className="w-4 h-4" />
                    </div>
                    <span>
                        {workspaces.title}
                    </span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 text-neutral-700">
                {routes.map((routes) => (
                    <Button
                        key={routes.label}
                        size="sm"
                        onClick={() => pushRef(routes.href)}
                        className={cn(
                            "w-full font-normal justify-start pl-10 mb-1",

                        )}
                        variant="ghost"
                    >
                        {routes.icon}
                        {routes.label}
                    </Button>
                ))}
            </AccordionContent>            
        </AccordionItem>
    )
}

/* TODO: ADD A SIDEBAR SKELETON HERE */
