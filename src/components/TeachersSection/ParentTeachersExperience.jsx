import { useCallback, useEffect, useRef, useState } from "react";
import { teachers } from "../../data/teachers";
import { teachersSectionCopy } from "../../data/teachersSectionCopy";
import TeacherProfileDialog from "./TeacherProfileDialog";

const copy = teachersSectionCopy.parent;

const getCarouselGap = (viewport) => {
  const track = viewport?.querySelector(".teachers-section__track");
  return track ? Number.parseFloat(getComputedStyle(track).columnGap) || 18 : 18;
};

const getCarouselStep = () => {
  if (window.matchMedia("(min-width: 1200px)").matches) return 3;
  if (window.matchMedia("(min-width: 768px)").matches) return 2;
  return 1;
};

export default function ParentTeachersExperience() {
  const viewportRef = useRef(null);
  const cardRefs = useRef([]);
  const triggerRef = useRef(null);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const [firstVisible, setFirstVisible] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const syncPosition = useCallback(() => {
    const viewport = viewportRef.current;
    const firstCard = cardRefs.current[0];
    if (!viewport || !firstCard) return;
    const pitch = firstCard.getBoundingClientRect().width + getCarouselGap(viewport);
    const step = getCarouselStep();
    const scrollIndex = Math.max(0, Math.round(viewport.scrollLeft / pitch));
    const maxScrollIndex = Math.max(0, Math.ceil((viewport.scrollWidth - viewport.clientWidth) / pitch));
    const reachedEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 2;
    const groupIndex = reachedEnd
      ? Math.ceil(scrollIndex / step) * step
      : Math.round(scrollIndex / step) * step;
    setFirstVisible(Math.min(teachers.length - 1, reachedEnd ? scrollIndex : groupIndex));
    setAtEnd(reachedEnd || scrollIndex >= maxScrollIndex);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncPosition);
    };
    viewport.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(syncPosition);
    observer.observe(viewport);
    syncPosition();
    return () => {
      viewport.removeEventListener("scroll", onScroll);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [syncPosition]);

  const move = (direction) => {
    const viewport = viewportRef.current;
    const card = cardRefs.current[0];
    if (!viewport || !card) return;
    const pitch = card.getBoundingClientRect().width + getCarouselGap(viewport);
    const step = getCarouselStep();
    const scrollIndex = Math.max(0, Math.round(viewport.scrollLeft / pitch));
    const maxScrollIndex = Math.max(0, Math.ceil((viewport.scrollWidth - viewport.clientWidth) / pitch));
    const reachedEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 2;
    const currentGroup = reachedEnd
      ? Math.ceil(scrollIndex / step) * step
      : Math.round(scrollIndex / step) * step;
    const targetIndex = Math.max(0, Math.min(maxScrollIndex, currentGroup + direction * step));
    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
    viewport.scrollTo({ left: Math.min(targetIndex * pitch, maxScrollLeft), behavior: "smooth" });
  };

  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    dragRef.current = { x: event.clientX, scrollLeft: viewportRef.current.scrollLeft, moved: false };
    viewportRef.current.setPointerCapture(event.pointerId);
    viewportRef.current.classList.add("is-dragging");
  };

  const onPointerMove = (event) => {
    if (!dragRef.current) return;
    const delta = event.clientX - dragRef.current.x;
    if (Math.abs(delta) > 5) dragRef.current.moved = true;
    if (dragRef.current.moved) {
      viewportRef.current.scrollLeft = dragRef.current.scrollLeft - delta;
      event.preventDefault();
    }
  };

  const onPointerUp = () => {
    if (!dragRef.current) return;
    suppressClickRef.current = dragRef.current.moved;
    dragRef.current = null;
    viewportRef.current?.classList.remove("is-dragging");
    if (suppressClickRef.current) window.setTimeout(() => { suppressClickRef.current = false; }, 0);
  };

  const closeProfile = useCallback(() => setSelectedTeacher(null), []);

  return <section className="teachers-section teachers-section--parent" id="teachers" aria-labelledby="teachers-title-parent">
    <div className="teachers-section__inner">
      <header className="teachers-section__heading">
        <span>{copy.eyebrow}</span>
        <h2 id="teachers-title-parent">{copy.title}</h2>
        <p>{copy.intro}</p>
      </header>

      <div className="teachers-section__showcase">
        <div className="teachers-section__carousel-tools">
          <span className="teachers-section__counter" aria-live="polite" aria-atomic="true">
            {String(firstVisible + 1).padStart(2, "0")} <span aria-hidden="true">/</span> {String(teachers.length).padStart(2, "0")}
          </span>
          <div className="teachers-section__arrows">
            <button type="button" aria-label="Предыдущие преподаватели" onClick={() => move(-1)} disabled={firstVisible === 0}>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" aria-label="Следующие преподаватели" onClick={() => move(1)} disabled={atEnd}>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <div
          className="teachers-section__viewport"
          ref={viewportRef}
          role="region"
          aria-label="Преподаватели школы. Перемещайтесь по карточкам горизонтально."
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onLostPointerCapture={onPointerUp}
        >
          <div className="teachers-section__track">
            {teachers.map((teacher, index) => <button
              className="teacher-card teacher-card--parent"
              type="button"
              key={teacher.id}
              ref={(node) => { cardRefs.current[index] = node; }}
              aria-haspopup="dialog"
              aria-label={`Подробнее о преподавателе: ${teacher.name}, ${teacher.subject}`}
              onClick={() => {
                if (suppressClickRef.current) return;
                triggerRef.current = cardRefs.current[index];
                setSelectedTeacher(teacher);
              }}
            >
              <span className="teacher-card__photo">
                <img
                  src={teacher.image}
                  alt=""
                  draggable="false"
                  style={{ objectPosition: teacher.portraitPosition || "50% 38%" }}
                />
              </span>
              <span className="teacher-card__caption">
                <strong>{teacher.name}</strong>
                <span>{teacher.subject}</span>
                <span className="teacher-card__description">{teacher.parent.short}</span>
                <span className="teacher-card__human-detail">{teacher.humanDetail}</span>
                <span className="teacher-card__more">Подробнее <span aria-hidden="true">→</span></span>
              </span>
            </button>) }
          </div>
        </div>
      </div>
    </div>
    <TeacherProfileDialog teacher={selectedTeacher} onClose={closeProfile} returnFocusRef={triggerRef} />
  </section>;
}
