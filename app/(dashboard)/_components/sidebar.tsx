"use client";

import { FormModal } from "@/components/form/form-modal";
import { Accordion } from "@/components/ui/accordion";
import { openModal } from "@/redux/features/store-modal-slice";
import { useLocalStorage } from "usehooks-ts"
import { useAppDispatch } from "@/redux/hooks";
import { Plus } from "lucide-react";
import { SidebarItems } from "./sidebar-items";
import { getWorkSpaces } from "@/actions/use-workspaces";
import { Workspaces } from "@/types";

interface SidebarProps {
    storageKey?: string;
};

export const Sidebar: React.FC<SidebarProps> = ({
    storageKey = "sidebar-storage"
}) => {
    const {workspaces} = getWorkSpaces();

    if (!workspaces) {
        return (
            <div>
                No workspaces created yet...
            </div>
        )
    }

    console.log("Reteived workspace data:", workspaces)
    const dispatch = useAppDispatch();
    const [open, setOpen] = useLocalStorage<Record<string, any>>(
        storageKey,
        {}
    );

    const accordionValues: string[] = Object.keys(open)
        .reduce((acc: string[], key: string) => {
            if (open[key]) {
                acc.push(key);
            }

            return acc;
        }, []);
    
    const onOpen = (id: string) => {
        setOpen((curr) => ({
            ...curr,
            [id]: !open[id]
        }))
    };

    const handleOpenModal = () => {
        dispatch(openModal());
    };

    /* TODO: ADD A SKELETON HERE */

    return (
        <>
            <div className="flex items-center text-xs mb-4 max-md:mt-5 font-medium">
                <span className="pl-4">
                    Workspaces
                </span>
                <div className="ml-auto">
                    <button onClick={handleOpenModal}>
                        <Plus className="h-4 w-4"/>
                    </button>
                    <FormModal />
                </div>
            </div>
            <Accordion
                type='multiple'
                defaultValue={accordionValues}
                className="space-y-2"
            >
                {workspaces.map((items) => ( 
                    <SidebarItems 
                        key={items.id}
                        isOpen={open[items.id]}
                        workspaces={items as Workspaces}
                        onOpen={onOpen}
                    />
                ))}

            </Accordion>
        </>
    )
}