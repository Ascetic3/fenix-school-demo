import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import studentPhoenix from "../assets/phoenix-student-v2-matched.png";
import leftBackgroundWave from "../assets/phoenix-left-bg-wave.png";
import rightBackgroundWave from "../assets/phoenix-right-bg-wave.png";
import "./StudentHeroV2.scss";

const entranceEase = [0.33, 0, 0.2, 1];
const parallaxSpring = { stiffness: 72, damping: 19, mass: 0.55 };

function useFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setHasFinePointer(query.matches);

    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return hasFinePointer;
}

export default function StudentHeroV2({ description }) {
  const shouldReduceMotion = useReducedMotion();
  const hasFinePointer = useFinePointer();
  const parallaxEnabled = hasFinePointer && !shouldReduceMotion;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const phoenixParallaxX = useSpring(useTransform(pointerX, [-1, 1], [-8, 8]), parallaxSpring);
  const phoenixParallaxY = useSpring(useTransform(pointerY, [-1, 1], [-5, 5]), parallaxSpring);
  const leftWaveX = useSpring(useTransform(pointerX, [-1, 1], [3, -3]), parallaxSpring);
  const leftWaveY = useSpring(useTransform(pointerY, [-1, 1], [2, -2]), parallaxSpring);
  const rightWaveX = useSpring(useTransform(pointerX, [-1, 1], [4, -4]), parallaxSpring);
  const rightWaveY = useSpring(useTransform(pointerY, [-1, 1], [-2, 2]), parallaxSpring);

  const waveInitial = shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 1.015 };
  const waveAnimate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 };
  const revealTransition = (delay = 0) => ({
    duration: shouldReduceMotion ? 0.2 : 0.7,
    delay: shouldReduceMotion ? 0 : delay,
    ease: entranceEase,
  });
  const textInitial = (y, x = 0) => (shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y, x });
  const textAnimate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, x: 0 };

  const handlePointerMove = (event) => {
    if (!parallaxEnabled) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  };

  const resetParallax = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      className="student-hero-v2"
      id="top"
      aria-labelledby="student-hero-v2-title"
      onPointerMove={parallaxEnabled ? handlePointerMove : undefined}
      onPointerLeave={parallaxEnabled ? resetParallax : undefined}
    >
      <motion.div className="student-hero-v2__wave-parallax" style={{ x: leftWaveX, y: leftWaveY }}>
        <motion.div
          className="student-hero-v2__wave-idle"
          animate={shouldReduceMotion ? undefined : { x: [0, 5, 0], y: [0, -3, 0] }}
          transition={{ delay: 1.45, duration: 16, ease: "easeInOut", repeat: Infinity }}
        >
          <motion.div
            className="student-hero-v2__wave-entrance student-hero-v2__wave-entrance--left"
            initial={waveInitial}
            animate={waveAnimate}
            transition={{ duration: shouldReduceMotion ? 0.2 : 1.45, delay: 0, ease: entranceEase }}
          >
            <img className="student-hero-v2__wave student-hero-v2__wave--left" src={leftBackgroundWave} alt="" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div className="student-hero-v2__wave-parallax" style={{ x: rightWaveX, y: rightWaveY }}>
        <motion.div
          className="student-hero-v2__wave-idle"
          animate={shouldReduceMotion ? undefined : { x: [0, -4, 0], y: [0, 3, 0] }}
          transition={{ delay: 1.5, duration: 17, ease: "easeInOut", repeat: Infinity }}
        >
          <motion.div
            className="student-hero-v2__wave-entrance student-hero-v2__wave-entrance--right"
            initial={waveInitial}
            animate={waveAnimate}
            transition={{ duration: shouldReduceMotion ? 0.2 : 1.35, delay: shouldReduceMotion ? 0 : 0.06, ease: entranceEase }}
          >
            <img className="student-hero-v2__wave student-hero-v2__wave--right" src={rightBackgroundWave} alt="" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div className="student-hero-v2__copy">
        <motion.p className="student-hero-v2__eyebrow" initial={textInitial(6)} animate={textAnimate} transition={revealTransition(0.36)}>
          Твой выбор тоже важен
        </motion.p>
        <h1 id="student-hero-v2-title">
          <motion.span className="student-hero-v2__headline-lines" initial={textInitial(10)} animate={textAnimate} transition={revealTransition(0.5)}>
            Школа, которую
          </motion.span>
          <motion.span className="student-hero-v2__accent" initial={textInitial(6, -3)} animate={textAnimate} transition={revealTransition(0.78)}>
            <span>можно выбрать</span>
            <span>самому</span>
          </motion.span>
        </h1>
        <motion.p className="student-hero-v2__description" initial={textInitial(7)} animate={textAnimate} transition={revealTransition(0.94)}>
          {description}
        </motion.p>
        <motion.a
          className="button button-primary student-hero-v2__cta"
          href="#demo-week"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 7, scale: 0.99 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          transition={revealTransition(1.08)}
        >
          Попробовать 5 дней <span aria-hidden="true">→</span>
        </motion.a>
      </motion.div>

      <div className="student-hero-v2__visual">
        <span className="student-hero-v2__glow" aria-hidden="true" />
        <span className="student-hero-v2__shadow" aria-hidden="true" />
        <div className="student-hero-v2__bird-position">
          <motion.div className="student-hero-v2__bird-parallax" style={{ x: phoenixParallaxX, y: phoenixParallaxY }}>
            <motion.div
              className="student-hero-v2__bird-entrance"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.99 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 1.42, delay: shouldReduceMotion ? 0 : 0.42, ease: entranceEase }}
            >
              <motion.div
                className="student-hero-v2__bird-idle"
                animate={shouldReduceMotion ? undefined : { y: [0, -5, 0], scale: [1, 1.004, 1] }}
                transition={{ delay: 1.66, duration: 7, ease: "easeInOut", repeat: Infinity }}
              >
                <img className="student-hero-v2__bird" src={studentPhoenix} alt="Стилизованный феникс в полёте" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
