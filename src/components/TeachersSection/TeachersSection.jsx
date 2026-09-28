import { useEffect, useRef } from "react";
import { teachers } from "../../data/teachers";
import { teachersSectionCopy } from "../../data/teachersSectionCopy";
import TeacherCard from "./TeacherCard";
import "./TeachersSection.scss";

export default function TeachersSection({ audience }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const hoveredRef = useRef(false);
  const copy = teachersSectionCopy[audience] || teachersSectionCopy.parent;

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || !teachers.length) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactLayout = window.matchMedia("(max-width: 820px)");
    const sets = track.querySelectorAll(".teachers-section__set");
    const cards = track.querySelectorAll(".teacher-card");
    let cycleWidth = 0;
    let offset = 0;
    let frame = 0;
    let previousTime = 0;
    let inView = false;

    const render = () => {
      if (!cycleWidth) return;
      const trackX = offset - cycleWidth;
      track.style.transform = `translate3d(${trackX}px, 0, 0)`;
      const center = viewport.clientWidth / 2;
      const range = center + 100;
      cards.forEach((card) => {
        const cardCenter = card.offsetLeft + trackX + card.offsetWidth / 2;
        const focus = Math.max(0, 1 - Math.abs(cardCenter - center) / range);
        card.style.setProperty("--teacher-focus", focus.toFixed(3));
      });
    };

    const measure = () => {
      cycleWidth = sets[1].offsetLeft - sets[0].offsetLeft;
      if (cycleWidth) offset %= cycleWidth;
      render();
    };

    const tick = (time) => {
      if (previousTime && !hoveredRef.current && cycleWidth) {
        offset = (offset + Math.min(time - previousTime, 64) * 0.018) % cycleWidth;
      }
      previousTime = time;
      render();
      frame = window.requestAnimationFrame(tick);
    };

    const stop = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    };

    const sync = () => {
      if (reducedMotion.matches || compactLayout.matches) {
        stop();
        track.style.removeProperty("transform");
        cards.forEach((card) => card.style.removeProperty("--teacher-focus"));
        return;
      }
      measure();
      if (inView && !frame) frame = window.requestAnimationFrame(tick);
      if (!inView) stop();
    };

    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: 0.1 }) : null;
    if (observer) observer.observe(viewport);
    else inView = true;

    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(sync) : null;
    if (resizeObserver) resizeObserver.observe(viewport);
    window.addEventListener("resize", sync);
    reducedMotion.addEventListener("change", sync);
    compactLayout.addEventListener("change", sync);
    sync();

    return () => {
      stop();
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("resize", sync);
      reducedMotion.removeEventListener("change", sync);
      compactLayout.removeEventListener("change", sync);
    };
  }, []);

  const titleId = `teachers-title-${audience}`;

  return <section className={`teachers-section teachers-section--${audience}`} id="teachers" aria-labelledby={titleId}>
    <div className="teachers-section__inner">
      <header className="teachers-section__heading">
        <span>{copy.eyebrow}</span>
        <h2 id={titleId}>{copy.title}</h2>
        <p>{copy.intro}</p>
      </header>
      <div className="teachers-section__showcase">
        <div
          className="teachers-section__viewport"
          ref={viewportRef}
          role="region"
          aria-label="Преподаватели школы, демонстрационные материалы"
          onPointerEnter={() => { hoveredRef.current = true; }}
          onPointerLeave={() => { hoveredRef.current = false; }}
        >
          <div className="teachers-section__track" ref={trackRef}>
            {[0, 1, 2].map((setIndex) => <div className="teachers-section__set" key={setIndex} aria-hidden={setIndex !== 1 ? "true" : undefined}>
              {teachers.map((teacher) => <TeacherCard key={`${setIndex}-${teacher.id}`} teacher={teacher} audience={audience} />)}
            </div>)}
          </div>
        </div>
        <div className="teachers-section__meta"><span>{copy.meta}</span></div>
      </div>
    </div>
  </section>;
}
