import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Sidebar } from "./sidebar"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { closeSheet, openSheet } from "@/redux/features/mobile-sidebar"

export const MobileSidebar = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(state => state.MobileSidebar.isOpen)

    const handleOpen = () => dispatch(openSheet());
  /*   const handleClose = (open: boolean) => {
        if (!open) {
            dispatch(closeSheet());
        };
    }; */
    const handleClose = () => dispatch(closeSheet());

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="ghost"
                className="block md:hidden"
            >
                <Menu className="h-4 w-4"/>
            </Button>
            <Sheet
                open={isOpen}
                onOpenChange={handleClose}
            >
                <SheetContent
                    side="left"
                    className=""
                >
                    <Sidebar 
                        storageKey="mobile-sidebar-storage"
                    />
                </SheetContent>
            </Sheet>
        </>
    )
}