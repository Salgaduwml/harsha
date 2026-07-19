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
 */

const SCRUB_VH = 300; // scroll distance = one full video scrub
const FADE_START = 0.8; // progress at which the crossfade begins

export default function ScrollVideoHero() {
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const [duration, setDuration] = useState(0);
    const [videoReady, setVideoReady] = useState(false);

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

    // Scrub the video as scroll progress changes
    useMotionValueEvent(scrollYProgress, 'change', (progress) => {
        const video = videoRef.current;
        if (!video || !duration) return;

        // Clamp to avoid seeking past the last frame
        const targetTime = Math.min(progress * duration, duration - 0.05);

        // Avoid redundant seeks (helps perf, especially on Safari)
        if (Math.abs(video.currentTime - targetTime) > 0.03) {
            video.currentTime = targetTime;
        }
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