"use client";

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";

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

    const openModal = useCallback((eventName?: string) => {
        setSelectedEvent(eventName ?? null);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setSelectedEvent(null);
    }, []);

    const value = useMemo(
        () => ({ isOpen, selectedEvent, openModal, closeModal }),
        [isOpen, selectedEvent, openModal, closeModal]
    );

    return (
        <RegistrationContext.Provider value={value}>
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
