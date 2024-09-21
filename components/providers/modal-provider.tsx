"use client";

import { CardModal } from "@/components/modals/card-modal"
import { useEffect, useState } from "react";
import { ProModal } from "../modals/pro-modal";


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
            <ProModal />
        </>
    )
}