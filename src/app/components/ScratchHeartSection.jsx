"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import ConfettiEffect from "./ConfettiEffect";

/* =========================================================
   CONFIG
========================================================= */

const SIZE = 300;
const HEART_SIZE = 250;

const BRUSH_RADIUS = 14;
const SCRATCH_THRESHOLD = 0.6;

/* =========================================================
   HEART SHAPE
========================================================= */

function createHeartPath(ctx, size = HEART_SIZE) {
  const cx = SIZE / 2;
  const cy = SIZE / 2;

  const width = size;
  const height = size;

  const top = cy - height * 0.36;
  const bottom = cy + height * 0.47;

  ctx.beginPath();

  // Center indentation
  ctx.moveTo(cx, top + height * 0.15);

  // Left lobe
  ctx.bezierCurveTo(
    cx - width * 0.08,
    top - height * 0.08,
    cx - width * 0.49,
    top - height * 0.02,
    cx - width * 0.49,
    top + height * 0.27,
  );

  ctx.bezierCurveTo(
    cx - width * 0.49,
    top + height * 0.56,
    cx - width * 0.2,
    top + height * 0.72,
    cx,
    bottom,
  );

  // Right lobe
  ctx.bezierCurveTo(
    cx + width * 0.2,
    top + height * 0.72,
    cx + width * 0.49,
    top + height * 0.56,
    cx + width * 0.49,
    top + height * 0.27,
  );

  ctx.bezierCurveTo(
    cx + width * 0.49,
    top - height * 0.02,
    cx + width * 0.08,
    top - height * 0.08,
    cx,
    top + height * 0.15,
  );

  ctx.closePath();
}

/* =========================================================
   DRAW REVEALED CONTENT
========================================================= */

function drawReveal(ctx) {
  ctx.clearRect(0, 0, SIZE, SIZE);

  createHeartPath(ctx);

  const gradient = ctx.createLinearGradient(0, 0, SIZE, SIZE);

  gradient.addColorStop(0, "#c9697f34");
  gradient.addColorStop(0.5, "#f2c4ce34");
  gradient.addColorStop(1, "#c9697f34");

  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.save();

  ctx.font = '700 80px "Tangerine", cursive';

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const textGradient = ctx.createLinearGradient(
    SIZE / 2 - 70,
    0,
    SIZE / 2 + 70,
    0,
  );

  textGradient.addColorStop(0, "#c9697f");

  textGradient.addColorStop(0.5, "#f2c4ce");

  textGradient.addColorStop(1, "#c9697f");

  ctx.fillStyle = textGradient;

  ctx.fillText("Yes!", SIZE / 2, SIZE / 2);

  ctx.restore();
}

/* =========================================================
   DRAW SCRATCH COVER
========================================================= */

function drawScratchCover(ctx) {
  ctx.clearRect(0, 0, SIZE, SIZE);

  createHeartPath(ctx);

  const roseGradient = ctx.createRadialGradient(
    SIZE * 0.37,
    SIZE * 0.3,
    10,
    SIZE / 2,
    SIZE / 2,
    SIZE * 0.65,
  );

  roseGradient.addColorStop(0, "#e59bab");

  roseGradient.addColorStop(0.45, "#d77e94");

  roseGradient.addColorStop(1, "#b85570");

  ctx.fillStyle = roseGradient;
  ctx.fill();

  /* Highlight */
  ctx.save();

  createHeartPath(ctx);
  ctx.clip();

  const highlight = ctx.createRadialGradient(
    SIZE * 0.28,
    SIZE * 0.25,
    0,
    SIZE * 0.3,
    SIZE * 0.28,
    SIZE * 0.42,
  );

  highlight.addColorStop(0, "rgba(255,255,255,0.25)");

  highlight.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = highlight;
  ctx.fillRect(0, 0, SIZE, SIZE);

  ctx.restore();

  /* Scratch instruction */
  ctx.save();

  ctx.font = "italic 15px Outfit, Arial, sans-serif";

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = "rgba(255,255,255,0.82)";

  ctx.shadowColor = "rgba(100,30,50,0.15)";

  ctx.shadowBlur = 5;

  ctx.fillText("scratch me", SIZE / 2, SIZE / 2);

  ctx.restore();
}

/* =========================================================
   CREATE HEART MASK

   This is crucial:
   only pixels inside this mask count toward
   scratch progress.
========================================================= */

function createHeartMask(dpr) {
  const maskCanvas = document.createElement("canvas");

  maskCanvas.width = SIZE * dpr;

  maskCanvas.height = SIZE * dpr;

  const ctx = maskCanvas.getContext("2d");

  ctx.scale(dpr, dpr);

  createHeartPath(ctx);

  ctx.fillStyle = "#000";
  ctx.fill();

  return maskCanvas;
}

/* =========================================================
   SCRATCH PERCENTAGE

   Compare the scratch canvas against
   the heart mask, ignoring everything outside.
========================================================= */

function getScratchPercentage(scratchCtx, maskCtx, width, height) {
  const scratchData = scratchCtx.getImageData(0, 0, width, height).data;

  const maskData = maskCtx.getImageData(0, 0, width, height).data;

  let heartPixels = 0;
  let scratchedPixels = 0;

  /*
   * Sample every 4th pixel.
   * This keeps touch interaction responsive.
   */
  const step = 4;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const index = (y * width + x) * 4;

      const maskAlpha = maskData[index + 3];

      /*
       * Outside the heart.
       */
      if (maskAlpha === 0) {
        continue;
      }

      heartPixels++;

      const scratchAlpha = scratchData[index + 3];

      /*
       * Transparent means scratched.
       */
      if (scratchAlpha === 0) {
        scratchedPixels++;
      }
    }
  }

  if (heartPixels === 0) {
    return 0;
  }

  return scratchedPixels / heartPixels;
}

/* =========================================================
   DRAW INTERPOLATED SCRATCH STROKE

   Inspired by CodePen's plotLine approach.
   This prevents gaps when the user moves
   their finger quickly.
========================================================= */

function scratchLine(ctx, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance === 0) {
    return;
  }

  /*
   * More samples for longer movements.
   */
  const steps = Math.max(1, Math.ceil(distance / 8));

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;

    const x = x1 + dx * t;

    const y = y1 + dy * t;

    ctx.beginPath();

    ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);

    ctx.fill();
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function ScratchHeartSection() {
  const revealCanvasRef = useRef(null);

  const scratchCanvasRef = useRef(null);

  const maskCanvasRef = useRef(null);

  const lastPointRef = useRef(null);

  const scratchingRef = useRef(false);

  const checkingRef = useRef(false);

  const triggeredRef = useRef(false);

  const animationFrameRef = useRef(null);

  const [scratchStarted, setScratchStarted] = useState(false);

  const [revealed, setRevealed] = useState(false);

  const [confettiTrigger, setConfettiTrigger] = useState(0);

  /* =======================================================
     INITIALIZE CANVASES
  ======================================================= */

  useEffect(() => {
    const initializeCanvas = async () => {
      const revealCanvas = revealCanvasRef.current;
      const scratchCanvas = scratchCanvasRef.current;

      if (!revealCanvas || !scratchCanvas) {
        return;
      }

      /*
       * Wait until the Google font loaded by next/font
       * is available to the browser.
       */
      await document.fonts.load('400 72px "Tangerine"');

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      /*
       * ---------------------------
       * Reveal canvas
       * ---------------------------
       */

      revealCanvas.width = SIZE * dpr;
      revealCanvas.height = SIZE * dpr;

      revealCanvas.style.width = `${SIZE}px`;
      revealCanvas.style.height = `${SIZE}px`;

      const revealCtx = revealCanvas.getContext("2d");

      if (!revealCtx) {
        return;
      }

      revealCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawReveal(revealCtx);

      /*
       * ---------------------------
       * Scratch canvas
       * ---------------------------
       */

      scratchCanvas.width = SIZE * dpr;
      scratchCanvas.height = SIZE * dpr;

      scratchCanvas.style.width = `${SIZE}px`;
      scratchCanvas.style.height = `${SIZE}px`;

      const scratchCtx = scratchCanvas.getContext("2d");

      if (!scratchCtx) {
        return;
      }

      scratchCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawScratchCover(scratchCtx);

      /*
       * ---------------------------
       * Heart mask
       * ---------------------------
       */

      const maskCanvas = createHeartMask(dpr);

      maskCanvasRef.current = maskCanvas;
    };

    initializeCanvas();
  }, []);

  /* =======================================================
     TOUCH POSITION
  ======================================================= */

  const getTouchPosition = useCallback((touch) => {
    const canvas = scratchCanvasRef.current;

    if (!canvas) {
      return {
        x: 0,
        y: 0,
      };
    }

    const rect = canvas.getBoundingClientRect();

    /*
     * Convert CSS pixels to our
     * fixed 300 × 300 coordinate system.
     */
    return {
      x: ((touch.clientX - rect.left) / rect.width) * SIZE,

      y: ((touch.clientY - rect.top) / rect.height) * SIZE,
    };
  }, []);

  /* =======================================================
     CHECK SCRATCH PROGRESS
  ======================================================= */

  const checkScratchProgress = useCallback(() => {
    if (triggeredRef.current || checkingRef.current) {
      return;
    }

    const scratchCanvas = scratchCanvasRef.current;

    const maskCanvas = maskCanvasRef.current;

    if (!scratchCanvas || !maskCanvas) {
      return;
    }

    checkingRef.current = true;

    const scratchCtx = scratchCanvas.getContext("2d");

    const maskCtx = maskCanvas.getContext("2d");

    const percentage = getScratchPercentage(
      scratchCtx,
      maskCtx,
      scratchCanvas.width,
      scratchCanvas.height,
    );

    checkingRef.current = false;

    if (percentage >= SCRATCH_THRESHOLD) {
      triggeredRef.current = true;

      /*
       * Fade out the remaining
       * scratch cover.
       */
      scratchCanvas.style.transition = "opacity 350ms ease";

      scratchCanvas.style.opacity = "0";

      setTimeout(() => {
        setRevealed(true);

        setConfettiTrigger((value) => value + 1);
      }, 350);
    }
  }, []);

  /* =======================================================
     SCRATCH
  ======================================================= */

  const scratch = useCallback(
    (x, y) => {
      const canvas = scratchCanvasRef.current;

      if (!canvas || triggeredRef.current) {
        return;
      }

      const ctx = canvas.getContext("2d");

      /*
       * We only want the finger
       * to erase the heart.
       *
       * Clip the canvas to the heart.
       */
      ctx.save();

      createHeartPath(ctx);

      ctx.clip();

      ctx.globalCompositeOperation = "destination-out";

      /*
       * First touch point.
       */
      if (!lastPointRef.current) {
        ctx.beginPath();

        ctx.arc(x, y, BRUSH_RADIUS, 0, Math.PI * 2);

        ctx.fill();
      } else {
        /*
         * Smooth continuous stroke.
         */
        scratchLine(ctx, lastPointRef.current.x, lastPointRef.current.y, x, y);
      }

      ctx.restore();

      lastPointRef.current = {
        x,
        y,
      };

      /*
       * Don't calculate on every touch event.
       * Wait for the browser's next frame.
       */
      if (!animationFrameRef.current) {
        animationFrameRef.current = requestAnimationFrame(() => {
          animationFrameRef.current = null;

          checkScratchProgress();
        });
      }
    },
    [checkScratchProgress],
  );

  /* =======================================================
     TOUCH START
  ======================================================= */

  const handleTouchStart = useCallback(
    (event) => {
      event.preventDefault();

      if (triggeredRef.current) {
        return;
      }

      scratchingRef.current = true;

      lastPointRef.current = null;

      if (!scratchStarted) {
        setScratchStarted(true);
      }

      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      const { x, y } = getTouchPosition(touch);

      scratch(x, y);
    },
    [getTouchPosition, scratch, scratchStarted],
  );

  /* =======================================================
     TOUCH MOVE
  ======================================================= */

  const handleTouchMove = useCallback(
    (event) => {
      event.preventDefault();

      if (!scratchingRef.current || triggeredRef.current) {
        return;
      }

      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      const { x, y } = getTouchPosition(touch);

      scratch(x, y);
    },
    [getTouchPosition, scratch],
  );

  /* =======================================================
     TOUCH END
  ======================================================= */

  const handleTouchEnd = useCallback(() => {
    scratchingRef.current = false;

    lastPointRef.current = null;

    /*
     * Do one final check after
     * the finger is released.
     */
    if (!triggeredRef.current) {
      checkScratchProgress();
    }
  }, [checkScratchProgress]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <SectionWrapper id="rsvp" noPadding>
      <div className="max-w-7xl mx-auto px-4 pt-10">
        {/* ================================================
            HEADER
        ================================================= */}

        <div className="text-center">
          <motion.h2
            className="font-heading font-bold text-5xl heading-glow bg-clip-text text-transparent bg-linear-to-b from-accent via-accent-light to-accent"
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.2,
            }}
          >
            Will You Join Us?
          </motion.h2>
          <div className="max-w-36 flex mx-auto">
            <svg
              width="278"
              height="32"
              viewBox="0 0 278 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M142.303 26.3843C142.303 26.3843 134.973 -1.5264 113.827 1.57494C92.682 4.67627 108.471 37.0989 123.414 29.4856C138.357 21.8736 119.185 -1.52639 92.9634 17.6456C66.7439 36.8176 49.2631 25.8202 47.572 12.8522C45.8798 -0.117085 62.9376 3.82959 60.8231 14.8256C58.7819 25.4363 38.5574 37.2296 30.9371 22.1549C24.4527 9.32693 44.7522 10.4549 38.6902 20.8869C32.2778 31.9256 14.3027 21.6456 1.3335 30.6416"
                stroke="url(#paint0_linear_2389_327)"
                strokeWidth="2.66667"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M135.531 26.3843C135.531 26.3843 142.862 -1.5264 164.007 1.57494C185.152 4.67627 169.363 37.0989 154.42 29.4856C139.478 21.8736 158.65 -1.52639 184.871 17.6456C211.091 36.8176 228.571 25.8202 230.262 12.8522C231.955 -0.117085 214.897 3.82959 217.011 14.8256C219.053 25.4363 239.277 37.2296 246.897 22.1549C253.382 9.32693 233.082 10.4549 239.144 20.8869C245.557 31.9256 263.532 21.6456 276.501 30.6416"
                stroke="url(#paint1_linear_2389_327)"
                strokeWidth="2.66667"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2389_327"
                  x1="142.303"
                  y1="15.988"
                  x2="1.3335"
                  y2="15.988"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#D5A95B" />
                  <stop offset="0.5" stopColor="#F0D69C" />
                  <stop offset="1" stopColor="#D5A95B" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_2389_327"
                  x1="135.531"
                  y1="15.988"
                  x2="276.501"
                  y2="15.988"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#D5A95B" />
                  <stop offset="0.5" stopColor="#F0D69C" />
                  <stop offset="1" stopColor="#D5A95B" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* ================================================
            HEART
        ================================================= */}

        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div
                key="scratch-heart"
                className="relative"
                initial={{
                  opacity: 0,
                  scale: 0.88,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.94,
                  y: -15,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  width: SIZE,
                  height: SIZE,
                  touchAction: "none",
                  userSelect: "none",
                  WebkitUserSelect: "none",
                }}
              >
                {/* ======================================
                    REVEAL CANVAS
                ======================================= */}

                <canvas
                  ref={revealCanvasRef}
                  className="absolute inset-0"
                  style={{
                    width: SIZE,
                    height: SIZE,
                    pointerEvents: "none",
                  }}
                />

                {/* ======================================
                    SCRATCH CANVAS
                ======================================= */}

                <canvas
                  ref={scratchCanvasRef}
                  className="absolute inset-0"
                  style={{
                    width: SIZE,
                    height: SIZE,
                    zIndex: 2,
                    touchAction: "none",
                    WebkitTapHighlightColor: "transparent",
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onTouchCancel={handleTouchEnd}
                />
              </motion.div>
            ) : (
              /* ==========================================
                 REVEALED STATE
              =========================================== */

              <motion.div
                key="celebration"
                className="text-center pt-16 pb-8"
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  className="text-7xl mb-4"
                  initial={{
                    scale: 0,
                    rotate: -15,
                  }}
                  animate={{
                    scale: 1,
                    rotate: 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 12,
                  }}
                >
                  💕
                </motion.div>

                <motion.p
                  className="font-heading text-4xl font-bold bg-clip-text text-transparent bg-linear-to-b from-rose via-blush to-rose mb-1"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.25,
                  }}
                >
                  See You There!
                </motion.p>

                <motion.p
                  className="font-accent italic text-lg"
                  style={{
                    color: "var(--garden-taupe)",
                  }}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.5,
                  }}
                >
                  We can&apos;t wait to celebrate with you 🎉
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================================================
            CONFETTI
        ================================================= */}

        <ConfettiEffect trigger={confettiTrigger} originX="50%" originY="40%" />
      </div>
    </SectionWrapper>
  );
}
