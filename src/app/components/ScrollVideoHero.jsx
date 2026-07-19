'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import HeroSection from './HeroSection';

/**
 * ScrollVideoHero
 * ----------------
 * - Wrapper div is tall (SCRUB_VH) to create scroll distance.
 * - Inner div is `sticky top-0 h-screen`, so it stays pinned while
 *   the wrapper scrolls past.
 * - scrollYProgress (0 -> 1 across the wrapper) is mapped to
 *   video.currentTime every frame -> "scrubbing" effect.
 * - During the last 20% of scroll the video fades to opacity 0
 *   and the HeroSection crossfades in on top.
 *
 * Performance notes:
 * - Seeks are buffered and applied once per rAF frame so we never
 *   fire seeks faster than the display refresh rate.
 * - A dead-zone of 0.08 s prevents micro-seeks from jittering.
 */

const SCRUB_VH = 300; // scroll distance = one full video scrub
const FADE_START = 0.8; // progress at which the crossfade begins
const SEEK_DEAD_ZONE = 0.08; // seconds — skip seeks smaller than this

export default function ScrollVideoHero() {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [duration, setDuration] = useState(0);
    const [videoReady, setVideoReady] = useState(false);

    // Buffered target time — updated on every scroll tick,
    // but only *applied* once per animation frame.
    const targetTimeRef = useRef(0);
    const rafIdRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Derive opacity values from scroll progress
    const videoOpacity = useTransform(scrollYProgress, [FADE_START, 1], [1, 0]);
    const heroOpacity = useTransform(scrollYProgress, [FADE_START, 1], [0, 1]);
    const heroY = useTransform(scrollYProgress, [FADE_START, 1], [40, 0]);

    // Grab duration once metadata loads
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoaded = () => {
            setDuration(video.duration);
            setVideoReady(true);
        };

        if (video.readyState >= 1) {
            handleLoaded();
        } else {
            video.addEventListener('loadedmetadata', handleLoaded);
            return () => video.removeEventListener('loadedmetadata', handleLoaded);
        }
    }, []);

    // -------------------------------------------------------
    // RAF seek loop — applies buffered target once per frame
    // -------------------------------------------------------
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !videoReady) return;

        function tick() {
            const target = targetTimeRef.current;
            if (Math.abs(video.currentTime - target) > SEEK_DEAD_ZONE) {
                video.currentTime = target;
            }
            rafIdRef.current = requestAnimationFrame(tick);
        }

        rafIdRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafIdRef.current != null) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [videoReady]);

    // Buffer target time on every scroll tick
    useMotionValueEvent(scrollYProgress, 'change', (progress) => {
        if (!duration) return;
        targetTimeRef.current = Math.min(progress * duration, duration - 0.05);
    });

    return (
        <div
            ref={containerRef}
            style={{ height: `${SCRUB_VH}vh` }}
            className="relative"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* VIDEO — fades out during last 20% of scroll */}
                <motion.video
                    ref={videoRef}
                    src="/hero-clip.mp4"
                    muted
                    playsInline
                    preload="auto"
                    style={{ opacity: videoOpacity }}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* HERO CONTENT — crossfades in as video disappears */}
                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="absolute inset-0 flex items-center justify-center w-full"
                >
                    <HeroSection />
                </motion.div>

                {!videoReady && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black">
                        <span className="text-sm text-white/60">Loading…</span>
                    </div>
                )}
            </div>
        </div>
    );
}
