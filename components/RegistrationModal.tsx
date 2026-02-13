"use client";

import { useRegistration } from "./RegistrationContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Building2, GraduationCap, Calendar } from "lucide-react";

const EVENTS = [
    { id: 1, title: "Uni2unicorn" },
    { id: 2, title: "Boardroom" },
    { id: 3, title: "Opening Ceremony" },
    { id: 4, title: "Internship Fair" },
    { id: 5, title: "Startup showcase" },
    { id: 6, title: "Biz Conclave" },
    { id: 7, title: "Unwind" },
];

export function RegistrationModal() {
    const { isOpen, closeModal, selectedEvent } = useRegistration();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        college: "",
        year: "",
        eventId: "" as string,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const eventId = formData.eventId ? Number(formData.eventId) : 0;
        if (!eventId || eventId < 1) {
            setError("Please select an event.");
            return;
        }
        if (!formData.name.trim() || !formData.email.trim()) {
            setError("Name and email are required.");
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventId,
                    email: formData.email.trim(),
                    name: formData.name.trim(),
                }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                const msg = data.detail
                    ? `${data.error}: ${data.detail}`
                    : data.error || "Failed to reserve seat. Please try again.";
                setError(msg);
                return;
            }
            setSuccessMessage("Registration complete!");
            setFormData({
                name: "",
                email: "",
                phone: "",
                college: "",
                year: "",
                eventId: "",
            });
            setTimeout(() => {
                setSuccessMessage(null);
                closeModal();
            }, 1800);
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[600px] bg-slate-950 border border-white/10 text-white p-0 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

                <div className="relative p-8">
                    <DialogHeader className="space-y-4 mb-8">
                        <DialogTitle className="text-4xl font-display font-bold tracking-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                            Reserve Your Spot
                        </DialogTitle>
                        <DialogDescription className="text-slate-400 text-base">
                            Join us at E-Summit 2026. Fill in your details below to secure your registration.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {successMessage && (
                            <p className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-md px-3 py-2 flex items-center gap-2">
                                <span className="font-semibold">{successMessage}</span>
                            </p>
                        )}
                        {error && (
                            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
                                {error}
                            </p>
                        )}
                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" />
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-primary/50 focus:ring-primary/20"
                                placeholder="Vidhi Saxena"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-primary/50 focus:ring-primary/20"
                                placeholder="vidhi@example.com"
                                required
                            />
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Phone className="w-4 h-4 text-primary" />
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-primary/50 focus:ring-primary/20"
                                placeholder="+91 98765 43210"
                                required
                            />
                        </div>

                        {/* College Field */}
                        <div className="space-y-2">
                            <Label htmlFor="college" className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-primary" />
                                College/University
                            </Label>
                            <Input
                                id="college"
                                value={formData.college}
                                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-primary/50 focus:ring-primary/20"
                                placeholder="Thapar Institute of Engineering & Technology"
                                required
                            />
                        </div>

                        {/* Year Field */}
                        <div className="space-y-2">
                            <Label htmlFor="year" className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-primary" />
                                Year of Study
                            </Label>
                            <Select value={formData.year} onValueChange={(value) => setFormData({ ...formData, year: value })}>
                                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20">
                                    <SelectValue placeholder="Select your year" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    <SelectItem value="1st">1st Year</SelectItem>
                                    <SelectItem value="2nd">2nd Year</SelectItem>
                                    <SelectItem value="3rd">3rd Year</SelectItem>
                                    <SelectItem value="4th">4th Year</SelectItem>
                                    <SelectItem value="postgrad">Postgraduate</SelectItem>
                                    <SelectItem value="alumni">Alumni</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Event Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="event" className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                Select Event
                            </Label>
                            <Select
                                value={formData.eventId || (selectedEvent ? String(EVENTS.find((e) => e.title.trim() === selectedEvent?.trim())?.id ?? "") : "")}
                                onValueChange={(value) => setFormData({ ...formData, eventId: value })}
                            >
                                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-primary/50 focus:ring-primary/20">
                                    <SelectValue placeholder="Choose an event" />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-900 border-white/10 text-white">
                                    {EVENTS.map((event) => (
                                        <SelectItem key={event.id} value={String(event.id)}>
                                            {event.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Submit Button */}
                        <div className="flex gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeModal}
                                className="flex-1 border-white/10 text-white hover:bg-white/5"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-bold shadow-[0_0_30px_rgba(168,85,247,0.3)] disabled:opacity-50"
                            >
                                {isSubmitting ? "Reserving..." : "Complete Registration"}
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
