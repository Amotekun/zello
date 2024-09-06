"use client";

import { CardModal } from "@/components/modals/card-modal"
import { useEffect, useState } from "react";


export const ModalProvider = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(true);
    })

    if (!isOpen) {
        return null;
    };

    return (
        <>
            <CardModal />
        </>
    )
}