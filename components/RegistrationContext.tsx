"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface RegistrationContextType {
    isOpen: boolean;
    selectedEvent: string | null;
    openModal: (eventName?: string) => void;
    closeModal: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export function RegistrationProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

    const openModal = (eventName?: string) => {
        setSelectedEvent(eventName || null);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedEvent(null);
    };

    return (
        <RegistrationContext.Provider value={{ isOpen, selectedEvent, openModal, closeModal }}>
            {children}
        </RegistrationContext.Provider>
    );
}

export function useRegistration() {
    const context = useContext(RegistrationContext);
    if (!context) {
        throw new Error("useRegistration must be used within RegistrationProvider");
    }
    return context;
}
