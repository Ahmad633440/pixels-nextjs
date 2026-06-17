'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Sparkles, Palette, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
    return (
        <div className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 max-w-6xl mx-auto overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-20 -z-10 left-1/4 size-80 bg-pink-600 blur-[300px] opacity-35 pointer-events-none" />
            <div className="absolute bottom-20 -z-10 right-1/4 size-80 bg-pink-600 blur-[300px] opacity-20 pointer-events-none" />

            {/* HERO SECTION */}
            <div className="text-center max-w-3xl mx-auto space-y-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-medium"
                >
                    <Sparkles className="size-3.5" />
                    <span>The Story Behind Thumblify</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-5xl font-bold tracking-tight text-white"
                >
                    We build tools for the{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-300">
                        creator grind.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base sm:text-lg text-zinc-300 leading-relaxed font-light"
                >
                    Look, we get it. You just spent 20 hours editing a video—pacing is tight, color grade is perfect, and the audio is clean. You're exhausted. But now comes the most stressful part: the thumbnail. 
                </motion.p>
            </div>

            {/* THE PROBLEM & SOLUTION SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">Why we started this.</h2>
                    <p className="text-zinc-400 leading-relaxed">
                        If no one clicks your video, no one gets to see your hard work. It's the harsh truth of YouTube. So, you end up opening Photoshop and staring at a blank canvas for another three hours, questioning your life choices. 
                    </p>
                    <p className="text-zinc-400 leading-relaxed">
                        We got tired of that grind. We believed that thumbnails shouldn't take longer than editing the actual video. So we built **Thumblify**—a no-nonsense AI generator designed to create high-converting thumbnails in seconds, not hours.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl space-y-6"
                >
                    <h3 className="text-xl font-bold text-white">What we actually provide:</h3>
                    
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="size-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shrink-0 text-pink-500">
                                <Palette className="size-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-zinc-200">Fresh Thumbnail Concepts</h4>
                                <p className="text-sm text-zinc-400 mt-1">No generic, repetitive templates. Tell us your topic, and our AI drafts custom high-contrast visuals designed to stand out in a busy feed.</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="size-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shrink-0 text-pink-500">
                                <Zap className="size-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-zinc-200">Instant Style Recreation</h4>
                                <p className="text-sm text-zinc-400 mt-1">See a thumbnail on YouTube that you love? Upload it, write what changes you want (e.g. your topic, different text), and get a recreated version matching its style.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* OUR PHILOSOPHY */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-24 p-8 rounded-2xl bg-linear-to-r from-pink-900/20 to-zinc-900/40 border border-pink-500/15 text-center max-w-4xl mx-auto space-y-6"
            >
                <h3 className="text-xl sm:text-2xl font-bold text-white">Keep making great videos. We'll handle the packaging.</h3>
                <p className="text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                    We're not here to replace human design—we're here to give creators their time back. Whether you need a final render to upload immediately or a solid base concept to tweak in Figma, Thumblify is your secret weapon.
                </p>
                <div className="flex justify-center pt-4">
                    <Link href="/generate">
                        <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 active:scale-95 transition-all text-white font-medium rounded-full py-3 px-8 shadow-lg shadow-pink-600/15">
                            Start Generating Free <ArrowRight className="size-4" />
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}
