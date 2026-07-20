'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from './HeroSection';
import { useLenis } from './LenisContext';

/**
 * ScrollVideoHero  (now: CinematicEntry)
 * ----------------------------------------
 * Flow:
 *  1. Page loads → fullscreen video (paused) + "Enter" button overlay.
 *  2. User clicks "Enter" → video plays, overlay fades out.
 *  3. Video ends → video fades to opacity 0, HeroSection fades in.
 */

export default function ScrollVideoHero() {
    const videoRef = useRef(null);
    const lenis = useLenis();

    // 'idle'    — waiting for user to click Enter
    // 'playing' — video is playing, overlay gone
    // 'done'    — video ended, HeroSection visible
    const [phase, setPhase] = useState('idle');
    const [videoReady, setVideoReady] = useState(false);

    // Preload video metadata as early as possible
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (video.readyState >= 1) {
            setVideoReady(true);
        } else {
            const handler = () => setVideoReady(true);
            video.addEventListener('loadedmetadata', handler);
            return () => video.removeEventListener('loadedmetadata', handler);
        }
    }, []);

    const handleEnter = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        setPhase('playing');
        video.play().catch(() => {
            // Autoplay blocked — skip straight to hero
            setPhase('done');
        });
    }, []);

    const handleVideoEnd = useCallback(() => {
        setPhase('done');
    }, []);

    // Lock Lenis scroll until video is done
    useEffect(() => {
        if (!lenis) return;
        if (phase === 'done') {
            lenis.start();
        } else {
            lenis.stop();
        }
    }, [lenis, phase]);

    // Also lock native scroll as a fallback
    useEffect(() => {
        document.body.style.overflow = phase === 'done' ? '' : 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, [phase]);

    return (
        <div className="relative w-full">

            {/* ─── Sticky video container ─── */}
            <div className="relative w-full h-screen overflow-hidden">

                <motion.video
                    ref={videoRef}
                    src="/hero-clip.mp4"
                    muted
                    playsInline
                    preload="auto"
                    onEnded={handleVideoEnd}
                    animate={{ opacity: phase === 'done' ? 0 : 1 }}
                    transition={{ duration: 1.4, ease: 'easeInOut' }}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <AnimatePresence>
                    {phase === 'idle' && (
                        <motion.div
                            key="overlay"
                            className="absolute inset-0 flex flex-col items-center justify-center z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: 'easeInOut' }}
                        >

                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 100%)',
                                }}
                            />


                            <button
                                id="enter-btn"
                                onClick={handleEnter}
                                disabled={!videoReady}
                                className="relative z-10 group"
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    cursor: videoReady ? 'pointer' : 'default',
                                    pointerEvents: videoReady ? 'auto' : 'none',
                                    opacity: videoReady ? 1 : 0.4,
                                    transition: 'opacity 0.35s ease',
                                }}
                            >

                                {/* Frosted circle — the transform lives HERE, on the element that owns backdrop-filter */}
                                <motion.span
                                    className="relative flex items-center justify-center w-25 h-25 rounded-full"
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={videoReady ? { scale: 1.08 } : undefined}
                                    whileTap={videoReady ? { scale: 0.96 } : undefined}
                                    transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
                                    style={{
                                        background:
                                            'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 60%)',
                                        backdropFilter: 'blur(10px)',
                                        WebkitBackdropFilter: 'blur(10px)',
                                        border: '1.5px solid rgba(255,255,255,0.35)',
                                        boxShadow:
                                            '0 0 40px rgba(255,255,255,0.08), inset 0 1px 1px rgba(255,255,255,0.3)',
                                    }}
                                >
                                    <span
                                        className="font-heading tracking-[0.25em] text-lg uppercase"
                                        style={{
                                            color: 'rgba(255,255,255,0.92)',
                                            textShadow: '0 1px 8px rgba(0,0,0,0.4)',
                                            letterSpacing: '0.05em',
                                        }}
                                    >
                                        Open
                                    </span>
                                </motion.span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>


                <AnimatePresence>
                    {!videoReady && (
                        <motion.div
                            key="loader"
                            className="absolute inset-0 flex items-center justify-center bg-black z-20"
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.div
                                className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ─── HeroSection — lives below (or fades in as video fades out) ─── */}
            <motion.div
                className='absolute inset-0'
                animate={{ opacity: phase === 'done' ? 1 : 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
                style={{ pointerEvents: phase === 'done' ? 'auto' : 'none' }}
            >
                <HeroSection />
            </motion.div>
        </div>
    );
}