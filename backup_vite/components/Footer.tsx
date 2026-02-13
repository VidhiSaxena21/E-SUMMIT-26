
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
            <div className="container px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    {/* Brand Section */}
                    <div>
                        <h2 className="text-2xl font-bold uppercase tracking-wider mb-4">TVC</h2>
                        <p className="text-white/60 text-sm mb-6">Ideate, Ascend, Lead</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white/80 hover:text-primary transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-white/80 hover:text-primary transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-white/80 hover:text-primary transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-lg font-bold mb-6">Contact Us</h3>
                        <div className="space-y-4 text-white/60 text-sm">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                                <p>
                                    Thapar Institute of Engineering & Technology, Thapar Technology Campus,<br />
                                    Bhadson Road, Patiala-147004, Punjab
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 shrink-0" />
                                <p>+91 98882 88349 +91 89293 45416</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 shrink-0" />
                                <p>tuedcell@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 text-center md:text-left">
                    <p className="text-white/40 text-xs">
                        © 2026 TVC. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
