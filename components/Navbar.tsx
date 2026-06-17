'use client'
import { MenuIcon, XIcon, ChevronDown } from "lucide-react"; 
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { navlinks } from "@/data/navlinks";
import { INavLink } from "@/types";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur bg-black/10"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 70 }}
            >
                <h1 className="text-2xl font-bold text-pink-500">Thumblify</h1>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navlinks.map((link: INavLink) => (
                        <div key={link.name} className="relative group py-2">
                            <Link 
                                href={link.href} 
                                className="flex items-center gap-1 hover:text-pink-500 transition"
                            >
                                {link.name}
                                {link.subLinks && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                            </Link>

                            {/* Dropdown Menu */}
                            {link.subLinks && (
                                <div className="absolute top-full left-0 hidden group-hover:block pt-2">
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden min-w-[200px] shadow-xl"
                                    >
                                        {link.subLinks.map((sub) => (
                                            <Link 
                                                key={sub.name} 
                                                href={sub.href}
                                                className="block px-4 py-3 text-sm hover:bg-pink-600/10 `hover:text-pink-500 transition"
                                            >
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <Link href="/generate">
                    <button className="hidden md:block px-6 py-2.5 bg-pink-600 hover:bg-pink-700 active:scale-95 transition-all rounded-full">
                        Get Started
                    </button>
                </Link>

                <button onClick={() => setIsOpen(true)} className="md:hidden">
                    <MenuIcon size={26} />
                </button>
            </motion.nav>

            {/* Mobile Menu (Updated for Sublinks) */}
            <div className={`fixed inset-0 z-[100] bg-black backdrop-blur-md flex flex-col items-center justify-center gap-6 md:hidden transition-transform duration-500 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {navlinks.map((link: INavLink) => (
                    <div key={link.name} className="flex flex-col items-center gap-2">
                        <Link href={link.href} onClick={() => !link.subLinks && setIsOpen(false)} className="text-2xl font-semibold">
                            {link.name}
                        </Link>
                        {link.subLinks && link.subLinks.map(sub => (
                            <Link key={sub.name} href={sub.href} onClick={() => setIsOpen(false)} className="text-pink-500 text-lg">
                                {sub.name}
                            </Link>
                        ))}
                    </div>
                ))}
                <button onClick={() => setIsOpen(false)} className="mt-8 p-3 bg-pink-600 rounded-full">
                    <XIcon />
                </button>
            </div>
        </>
    );
}