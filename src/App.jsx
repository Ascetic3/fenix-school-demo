import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import studentHubRightWingSvg from "./assets/studenthub-right-wing.svg?raw";
import {
  admissionSteps, audienceContent, demoWeekFields, documents, navigation, prices, programs, reviews,
  studentAdvantages, studentGallery, studentReviews, studentSocials, teachers,
} from "./content";

const audienceIds = ["parent", "student"];

function readAudienceFromQuery() {
  const value = new URLSearchParams(window.location.search).get("audience");
  return audienceIds.includes(value) ? value : null;
}

function readStoredAudience() {
  try {
    const value = window.localStorage.getItem("fenix-audience");
    return audienceIds.includes(value) ? value : null;
  } catch {
    return null;
  }
}

function AudienceSwitch({ audience, onChange, compact = false }) {
  return <div className={`audience-switch is-${audience}${compact ? " compact" : ""}`} aria-label="Выбор аудитории">
    {audienceIds.map((id) => <button key={id} type="button" aria-pressed={audience === id} className={audience === id ? "active" : ""} onClick={() => onChange(id)}>{compact ? audienceContent[id].switchLabel : audienceContent[id].choiceLabel}</button>)}
  </div>;
}

const audienceChoices = {
  parent: "Программа, условия, стоимость и поступление",
  student: "Атмосфера, экзамены и школьная жизнь",
};

function AudienceWelcome({ onChoose }) {
  return <div className="audience-welcome-layer">
    <section className="audience-welcome" role="dialog" aria-labelledby="audience-welcome-title" aria-describedby="audience-welcome-description">
      <div className="audience-welcome-heading">
        <span>Персональная версия сайта</span>
        <h2 id="audience-welcome-title">Кто выбирает школу?</h2>
        <p id="audience-welcome-description">Мы немного изменим сайт под то, что важно именно вам.</p>
      </div>
      <div className="audience-choice-list">
        {audienceIds.map((id) => <button key={id} type="button" onClick={() => onChoose(id)}>
          <strong>{audienceContent[id].choiceLabel}</strong>
          <span>{audienceChoices[id]}</span>
          <b aria-hidden="true">→</b>
        </button>)}
      </div>
      <small>Выбор можно изменить в любой момент</small>
    </section>
  </div>;
}

function Documents({ compact = false }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const close = (event) => event.key === "Escape" && setOpen(false);
    const outside = (event) => !menuRef.current?.contains(event.target) && setOpen(false);
    window.addEventListener("keydown", close);
    document.addEventListener("mousedown", outside);
    return () => {
      window.removeEventListener("keydown", close);
      document.removeEventListener("mousedown", outside);
    };
  }, []);
  return <div className="documents-menu-wrap" ref={menuRef}>
    <button className={`documents-trigger${compact ? " compact" : ""}`} aria-expanded={open} onClick={() => setOpen((value) => !value)}>▤ Документы</button>
    {open && <div className="documents-popover" role="menu" aria-label="Документы школы">
      <div className="documents-popover-head"><strong>Документы</strong><span>Три файла для скачивания</span></div>
      <div className="documents-popover-list">
        {documents.map(([label, href, instruction], index) => href ? (
          <a href={href} download key={label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}</strong><b>↓</b></a>
        ) : (
          <div className="document-pending" key={label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{label}<small>{instruction}</small></strong><b>PDF</b></div>
        ))}
      </div>
    </div>}
  </div>;
}

const tabs = [["programs", "Обучение"], ["why", "Почему Феникс"], ["pricing", "Стоимость"], ["admission", "Поступление"]];

function Programs() {
  return <section className="tab-panel">
    <div className="panel-heading"><span>Образовательный маршрут</span><h2>От первых букв<br />до выбора профессии</h2><p>Выберите возрастной этап. Здесь собрана программа без переходов на отдельные страницы.</p></div>
    <div className="program-tiles">{programs.map(([number, ages, title, text]) => <article key={number}><div className="tile-number">{number}</div><span>{ages}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
  </section>;
}

function Why({ content }) {
  return <section className="tab-panel why-panel"><div className="why-compact">
    <div className="why-compact-heading"><span>Почему Феникс</span><h2>{content.whyTitle}</h2><p>{content.whyDescription}</p></div>
    <div className="why-list">{content.advantages.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    <aside className="founder-mini"><img src="./images/founder.jpg" alt="Наталья Сергеевна Маковецкая" /><div><span>Основатель школы</span><h3>Наталья Сергеевна Маковецкая</h3><p>Педагог с 25-летним стажем, тренер по олимпиадной математике и ТРИЗ-играм.</p></div></aside>
  </div></section>;
}

function Pricing() {
  return <section className="tab-panel pricing-panel">
    <div className="panel-heading light"><span>Открытая стоимость</span><h2>Цены до первого звонка</h2><p>Вступительный взнос при поступлении — 75 000 ₽.</p></div>
    <div className="compact-price-grid">{prices.map(([title, price, period, details]) => <article key={title}><h3>{title}</h3><strong>{price}</strong><p>{period}</p><ul>{details.map((item) => <li key={item}>✓ {item}</li>)}</ul></article>)}</div>
    <p className="pricing-note">Ежегодный платёж за учебники и материалы: 33 000 ₽ в начальной школе и 40 000 ₽ в средней.</p>
  </section>;
}

function Admission() {
  return <section className="tab-panel admission-panel">
    <div className="panel-heading"><span>Путь поступления</span><h2>Сначала познакомимся</h2><p>Экскурсия, диагностика, документы и мягкое знакомство с новым учебным ритмом.</p></div>
    <div className="admission-steps-compact">{admissionSteps.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    <section className="demo-details"><div className="demo-details-heading"><div><span>◉ Нужно уточнить у школы</span></div><h3>Условия демонедели</h3><p>Карточки уже готовы. Вместо неподтверждённых сведений внутри оставлены инструкции для заполнения.</p></div>
      <div className="demo-field-grid">{demoWeekFields.map(([title, instruction]) => <article key={title}><span>Заполнить</span><h4>{title}</h4><p>{instruction}</p></article>)}</div>
    </section>
  </section>;
}

function SchoolTabs({ content }) {
  const [active, setActive] = useState("programs");
  const panels = { programs: <Programs />, why: <Why content={content} />, pricing: <Pricing />, admission: <Admission /> };
  return <div className="school-tabs">
    <div className="school-tabs-list" role="tablist" aria-label="Информация о школе">{tabs.map(([id, label]) => <button key={id} role="tab" aria-selected={active === id} className={active === id ? "active" : ""} onClick={() => setActive(id)}>{label}</button>)}</div>
    <div className="school-tabs-stage">{panels[active]}</div>
    <section className="demo-ribbon" id="demo-week"><div className="demo-ribbon-icon">✦</div><div><span>Попробовать школу</span><h2>{content.demoTitle}</h2><p>{content.demoDescription}</p></div><a href="tel:+79122795067">{content.demoCta}</a></section>
    <div className="trust-row">{content.trust.map((item) => <span key={item}>{item}</span>)}</div>
  </div>;
}

function StudentIcon({ name }) {
  return <svg viewBox="0 0 48 48" aria-hidden="true">
    {name === "group" && <><circle cx="18" cy="17" r="6" /><circle cx="32" cy="19" r="5" /><path d="M7 37c1-7 5-11 11-11s10 4 11 11M27 29c2-2 4-3 7-3 5 0 8 4 9 10" /></>}
    {name === "dialog" && <><path d="M8 10h32v23H22l-9 7v-7H8z" /><path d="M15 18h18M15 24h12" /></>}
    {name === "target" && <><circle cx="23" cy="25" r="15" /><circle cx="23" cy="25" r="8" /><path d="M23 25 39 9M32 9h7v7" /></>}
    {name === "spark" && <><path d="m24 7 3.5 10.5L38 21l-10.5 3.5L24 35l-3.5-10.5L10 21l10.5-3.5z" /><path d="m38 31 1.5 4.5L44 37l-4.5 1.5L38 43l-1.5-4.5L32 37l4.5-1.5z" /></>}
  </svg>;
}

function StudentAccent({ variant }) {
  return <span className={`student-accent student-accent-${variant}`} aria-hidden="true">
    {variant === "cta" && <svg viewBox="0 0 430 130" focusable="false">
      <path className="accent-main" d="M8 104c76 5 139-52 220-43 72 8 108 46 194 15" />
      <path className="accent-barb" d="M339 74c30-18 55-21 78-16M354 86c23 1 43-4 63-14M372 96c17 0 31-4 45-11" />
      <path className="accent-spark" d="m286 31 4 9 10 3-9 4-3 10-4-9-10-3 9-4z" />
    </svg>}
  </span>;
}

function StudentHeroBands() {
  return <svg className="student-hero-bands" viewBox="0 0 1000 720" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="student-hero-ribbon-gradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#e92f20" />
        <stop offset="1" stopColor="#ff6a22" />
      </linearGradient>
    </defs>
    <g className="student-hero-ribbons-desktop">
      <path d="M 180 0 H 275 L 95 720 H 0 Z" />
      <path d="M 1060 0 H 1155 L 970 720 H 875 Z" />
    </g>
    <g className="student-hero-ribbons-tablet">
      <path d="M 180 0 H 240 L 60 720 H 0 Z" />
      <path d="M 1040 0 H 1100 L 960 720 H 900 Z" />
    </g>
  </svg>;
}

function StudentHubDecor({ className = "" }) {
  return <div className={`student-hub-decor${className ? ` ${className}` : ""}`} aria-hidden="true">
    <svg className="student-hub-decor-piece decor-left" viewBox="0 0 360 270" focusable="false">
      <defs><linearGradient id="fenixRibbon" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#d92f20" /><stop offset="1" stopColor="#ff6a1a" /></linearGradient></defs>
      <path className="decor-fill" d="M0 12 L118 0 L18 98 L0 111 Z" fill="url(#fenixRibbon)" />
      <path className="decor-fill" d="M0 112 L170 6 L192 10 L0 143 Z" fill="#f05a24" />
      <path className="decor-fill" d="M0 151 L234 16 L256 20 L0 181 Z" fill="#ef3d22" />
      <path className="decor-stroke" pathLength="1" d="M0 182 C38 160 76 151 125 147" fill="none" stroke="#e73722" strokeWidth="8" strokeLinecap="round" />
      <path className="decor-stroke" pathLength="1" d="M0 207 C34 188 67 180 108 176" fill="none" stroke="#f05a24" strokeWidth="7" strokeLinecap="round" />
      <path className="decor-stroke" pathLength="1" d="M0 229 C26 215 52 207 84 203" fill="none" stroke="#ef3d22" strokeWidth="6" strokeLinecap="round" />
      <path className="decor-spark" d="M184 72 C190 90 194 94 212 100 C194 106 190 110 184 128 C178 110 174 106 156 100 C174 94 178 90 184 72 Z" fill="#e73722" />
    </svg>
    <div className="student-hub-decor-piece decor-right" dangerouslySetInnerHTML={{ __html: studentHubRightWingSvg }} />
  </div>;
}

function StudentHubUnderline() {
  return <svg className="student-hub-underline" viewBox="0 0 260 34" aria-hidden="true" focusable="false">
    <path className="student-hub-underline-main" pathLength="1" d="M6 20 C54 5 101 8 142 14 C185 20 221 21 254 12" />
    <path className="student-hub-underline-detail" pathLength="1" d="M156 22 C190 27 223 24 252 17" />
  </svg>;
}

function StudentExperience({ items }) {
  return <section className="student-experience student-experience-embedded is-revealed" aria-labelledby="student-experience-title">
    <div className="student-shell">
      <div className="student-experience-heading"><span>Коротко о главном</span><h2 id="student-experience-title">Как здесь учиться</h2><p>Три вещи, которые определяют обычный учебный день.</p></div>
      <div className="student-experience-grid">{items.map(({ icon, image, title, text }, index) => <article className={`student-advantage-card card-${index + 1}`} key={title}><span className="student-card-number">0{index + 1}</span><span className="student-advantage-icon"><StudentIcon name={icon} /></span><h3>{title}</h3><p>{text}</p>{image && <img className="student-advantage-photo" src={image} alt="" />}</article>)}</div>
    </div>
  </section>;
}

function StudentPeople({ teachers }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const hoveredRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || !teachers.length) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactLayout = window.matchMedia('(max-width: 820px)');
    const sets = track.querySelectorAll('.student-teacher-set');
    const cards = track.querySelectorAll('.student-teacher-card');
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
        card.style.setProperty('--teacher-focus', focus.toFixed(3));
      });
    };

    const measure = () => {
      cycleWidth = sets[1].offsetLeft - sets[0].offsetLeft;
      if (cycleWidth) offset %= cycleWidth;
      render();
    };

    const tick = (time) => {
      if (previousTime && !pausedRef.current && !hoveredRef.current && cycleWidth) {
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
        track.style.removeProperty('transform');
        cards.forEach((card) => card.style.removeProperty('--teacher-focus'));
        return;
      }
      measure();
      if (inView && !frame) frame = window.requestAnimationFrame(tick);
      if (!inView) stop();
    };

    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: 0.1 }) : null;
    if (observer) observer.observe(viewport);
    else inView = true;

    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(sync) : null;
    if (resizeObserver) resizeObserver.observe(viewport);
    window.addEventListener('resize', sync);
    reducedMotion.addEventListener('change', sync);
    compactLayout.addEventListener('change', sync);
    sync();

    return () => {
      stop();
      observer?.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener('resize', sync);
      reducedMotion.removeEventListener('change', sync);
      compactLayout.removeEventListener('change', sync);
    };
  }, [teachers.length]);

  return <div className="student-hub-panel student-people">
    <div className="student-people-heading"><span>Люди</span><h3>С кем ты<br />будешь<br />учиться</h3><p>В нашей школе рядом опытные и внимательные преподаватели. Они знают свой предмет и помогают каждому ученику расти.</p></div>
    <div className="student-teacher-showcase">
      <div className="student-teacher-viewport" ref={viewportRef} role="region" aria-label="Преподаватели школы, демонстрационные материалы" onPointerEnter={() => { hoveredRef.current = true; }} onPointerLeave={() => { hoveredRef.current = false; }}>
        <div className="student-teacher-track" ref={trackRef}>
          {[0, 1, 2].map((copy) => <div className="student-teacher-set" key={copy} aria-hidden={copy !== 1 ? 'true' : undefined}>
            {teachers.map((teacher, index) => <article className="student-teacher-card" key={`${copy}-${teacher.subject}-${index}`}>
              <div className="student-teacher-photo"><img src={teacher.photo} alt={teacher.placeholder ? 'Демонстрационное фото преподавателя' : teacher.name} style={{ objectPosition: teacher.portraitPosition || '50% 38%' }} /><span aria-hidden="true">{teacher.placeholder ? 'ДЕМО' : ''}</span></div>
              <div className="student-teacher-caption"><strong>{teacher.placeholder ? 'Имя уточняется' : teacher.name}</strong><span>{teacher.subject}</span></div>
            </article>)}
          </div>)}
        </div>
      </div>
      <div className="student-teacher-meta"><span>Люди, с которыми можно учиться и говорить</span><button type="button" onClick={() => setIsPaused((value) => !value)} aria-label={isPaused ? 'Продолжить движение ленты преподавателей' : 'Остановить движение ленты преподавателей'}>{isPaused ? 'Продолжить' : 'Пауза'}</button></div>
    </div>
  </div>;
}

function StudentLife({ items }) {
  const photos = items.slice(0, 3);
  const [selected, setSelected] = useState(null);
  const [closing, setClosing] = useState(false);
  const [photoDirection, setPhotoDirection] = useState("forward");
  const triggerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const closeTimerRef = useRef(null);
  const isOpen = selected !== null;

  const finishClose = () => {
    window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
    setSelected(null);
    setClosing(false);
  };

  const closeLightbox = () => {
    if (closing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishClose();
      return;
    }
    setClosing(true);
    closeTimerRef.current = window.setTimeout(finishClose, 210);
  };

  const openLightbox = (index, trigger) => {
    triggerRef.current = trigger;
    setPhotoDirection("forward");
    setClosing(false);
    setSelected(index);
  };

  const move = (step) => {
    setPhotoDirection(step > 0 ? "forward" : "backward");
    setSelected((value) => (value + step + photos.length) % photos.length);
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarGap > 0) document.body.style.paddingRight = `${scrollbarGap}px`;

    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
      if (event.key !== "Tab") return;
      const controls = [...document.querySelectorAll(".student-lightbox button")];
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  const lightbox = selected !== null && <div className={`student-lightbox${closing ? " is-closing" : ""}`} role="dialog" aria-modal="true" aria-label="Просмотр фотографии" onMouseDown={(event) => event.target === event.currentTarget && closeLightbox()}>
    <div className="student-lightbox-dialog">
      <button type="button" ref={closeButtonRef} className="student-lightbox-close" onClick={closeLightbox} aria-label="Закрыть просмотр фотографии">Закрыть ×</button>
      <button type="button" className="student-lightbox-arrow previous" onClick={() => move(-1)} aria-label="Предыдущая фотография">←</button>
      <figure key={selected} className={`photo-${photoDirection}`}><img src={photos[selected].src} alt={photos[selected].title} style={{ objectPosition: photos[selected].position }} /><figcaption>{photos[selected].title}</figcaption></figure>
      <button type="button" className="student-lightbox-arrow next" onClick={() => move(1)} aria-label="Следующая фотография">→</button>
    </div>
  </div>;

  return <div className="student-hub-panel student-life"><div className="student-panel-heading"><span>Школьная жизнь</span><h3>Как выглядит обычный день</h3><p>Один главный кадр и несколько деталей — без бесконечной фотоленты.</p></div><div className="student-life-grid">{photos.map((photo, index) => <button type="button" key={photo.title} className={index === 0 ? "featured" : ""} onClick={(event) => openLightbox(index, event.currentTarget)}><img src={photo.src} alt={photo.title} style={{ objectPosition: photo.position }} /><span>{photo.title}</span></button>)}</div><p className="student-placeholder-note">Демонстрационные фотографии. В финальной версии будут заменены реальными материалами школы.</p>{lightbox && createPortal(lightbox, document.body)}</div>;
}

function StudentMedia({ items }) {
  return <div className="student-hub-panel student-media"><div className="student-panel-heading"><span>Фото и видео</span><h3>Посмотри школу своими глазами</h3><p>Видео, несколько кадров и соцсети — как второй способ увидеть актуальную жизнь школы.</p></div><div className="student-media-layout"><article className="student-media-video"><img src="./images/student-demo/student-demo-talk.jpg" alt="Временная демонстрационная фотография для видеоблока" /><span aria-hidden="true">▶</span><div><small>Видео · placeholder</small><strong>Школа в движении</strong></div></article><div className="student-media-side"><div className="student-media-previews">{items.slice(1, 3).map((item) => <figure key={item.title}><img src={item.src} alt={item.title} style={{ objectPosition: item.position }} /><figcaption>{item.title}</figcaption></figure>)}</div><div className="student-media-socials">{studentSocials.map(({ icon, title, href }) => <a key={title} href={href} aria-disabled={href === "#"} onClick={(event) => href === "#" && event.preventDefault()}><b aria-hidden="true">{icon}</b><span>{title}<small>Ссылка уточняется</small></span><i aria-hidden="true">↗</i></a>)}</div></div></div></div>;
}

const studentHubTabs = [["people", "Люди"], ["study", "Учёба"], ["life", "Школьная жизнь"], ["media", "Фото и видео"]];

function StudentHub() {
  const [active, setActive] = useState("people");
  const [direction, setDirection] = useState("forward");
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);
  const activeIndex = studentHubTabs.findIndex(([id]) => id === active);
  const panels = { people: <StudentPeople teachers={teachers} />, study: <StudentExperience items={studentAdvantages} />, life: <StudentLife items={studentGallery} />, media: <StudentMedia items={studentGallery} /> };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsRevealed(true);
      observer.disconnect();
    }, { threshold: 0.4, rootMargin: "0px 0px -8%" });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const selectTab = (id, nextIndex) => {
    if (id === active) return;
    setDirection(nextIndex > activeIndex ? "forward" : "backward");
    setActive(id);
  };
  return <section ref={sectionRef} className={`student-hub${isRevealed ? " is-revealed" : ""}`} id="explore" aria-labelledby="student-hub-title"><StudentHubDecor /><div className="student-shell"><div className="student-hub-heading"><span>Феникс изнутри</span><h2 id="student-hub-title">Выбери, что тебе<br />интересно</h2><StudentHubUnderline /></div><div className="student-hub-tabs" role="tablist" aria-label="Феникс изнутри" style={{ "--hub-index": activeIndex }}>{studentHubTabs.map(([id, label], index) => <button key={id} id={`student-tab-${id}`} role="tab" aria-selected={active === id} aria-controls={`student-panel-${id}`} className={active === id ? "active" : ""} onClick={() => selectTab(id, index)}><span className="student-hub-tab-label"><svg className="student-hub-tab-spark" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="M24 2 C27.5 14.5 30 17 42 24 C30 31 27.5 33.5 24 46 C20.5 33.5 18 31 6 24 C18 17 20.5 14.5 24 2 Z" /></svg>{label}<svg className="student-hub-tab-underline" viewBox="0 0 160 12" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path pathLength="1" vectorEffect="non-scaling-stroke" d="M2 8 C30 3 57 4 82 7 C108 10 134 9 158 5" /></svg></span></button>)}</div><div className={`student-hub-stage direction-${direction}`} id={`student-panel-${active}`} role="tabpanel" aria-labelledby={`student-tab-${active}`} key={active}>{panels[active]}</div></div><StudentHubBottomDecor /></section>;
}

function StudentHubBottomDecor() {
  const [isRevealed, setIsRevealed] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsRevealed(true);
      observer.disconnect();
    }, { threshold: 0.2, rootMargin: "0px 0px -5% 0px" });
    observer.observe(trigger);
    return () => observer.disconnect();
  }, []);

  return <div ref={triggerRef} className={`student-hub-bottom-decor${isRevealed ? " is-revealed" : ""}`} aria-hidden="true">
    <img src="./images/student-demo/student-people-stories-transition.svg" alt="" draggable="false" />
  </div>;
}

function StudentStories({ items, content }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);
  const carouselItems = items.filter(({ title }) => title !== "Самое полезное — сначала попробовать");
  const [index, setIndex] = useState(0);
  const safeIndex = index % carouselItems.length;
  const review = carouselItems[safeIndex];
  const photo = studentGallery.find(({ src }) => src.endsWith("student-demo-project.jpg")) || studentGallery[0];
  const previous = () => setIndex((value) => (value - 1 + carouselItems.length) % carouselItems.length);
  const next = () => setIndex((value) => (value + 1) % carouselItems.length);

  useEffect(() => setIndex(0), [items]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setIsRevealed(true);
      observer.disconnect();
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return <section ref={sectionRef} className={`student-stories${isRevealed ? " is-revealed" : ""}`} id="reviews" aria-labelledby="student-stories-title"><div className="student-shell">
    <div className="student-stories-heading"><div><span>Истории учеников</span><h2 id="student-stories-title">Настоящие люди.<br />Настоящие истории.</h2></div><p>В Фениксе учатся такие же ребята, как ты. Они рассказывают, что на самом деле значит быть здесь.</p></div>
    <div className="student-stories-grid">
      <figure className="student-stories-photo"><img src={photo.src} alt={photo.title} style={{ objectPosition: photo.position }} /></figure>
      <article className="student-story-review" aria-live="polite" key={review.title}>
        <div className="student-story-quote" aria-hidden="true">“</div><h3>{review.title}</h3><p>{review.text}</p>
        <div className="student-story-footer"><div className="student-story-author"><span><StudentIcon name="group" /></span><div><strong>{review.role}</strong><small>Текст для демонстрации</small></div></div><div className="reviews-controls"><span>{safeIndex + 1} / {carouselItems.length}</span><button onClick={previous} aria-label="Предыдущий отзыв">←</button><button onClick={next} aria-label="Следующий отзыв">→</button></div></div>
      </article>
      <article className="student-story-cta" id="demo-week"><span>Попробовать школу</span><h3>5 дней<br />в Фениксе</h3><p>{content.demoDescription}</p><ul>
        <li><span><StudentIcon name="dialog" /></span>Посетишь настоящие уроки</li>
        <li><span><StudentIcon name="group" /></span>Познакомишься с учителями и ребятами</li>
        <li><span><StudentIcon name="target" /></span>Поймёшь, подходит ли тебе формат</li>
      </ul><a className="button" href="tel:+79122795067">Попробовать 5 дней →</a></article>
    </div>
  </div></section>;
}

function StudentNextSteps() {
  const priceIcons = ["spark", "dialog", "target"];
  const stepIcons = ["dialog", "group", "target", "spark"];
  return <section className="student-next"><div className="student-shell"><div className="student-practical">
    <article className="student-pricing-card"><span>Стоимость</span><h3>Инвестиция<br />в большое будущее</h3><div className="student-price-grid">{prices.map(([title, price, period, details], index) => <section className="student-price-card" key={title}><span className="student-price-icon"><StudentIcon name={priceIcons[index]} /></span><h4>{title}</h4><p>{details[0]}</p><strong>{price}</strong><small>{period}</small></section>)}</div><small className="student-entry-fee">Вступительный взнос при поступлении — 75 000 ₽.</small></article>
    <article className="student-admission-card"><span>Как поступить</span><h3>Простой путь<br />к большим возможностям</h3><div className="student-admission-path">{admissionSteps.map(([number, title, text], index) => <section key={number}><b>{number}</b><span className="student-admission-icon"><StudentIcon name={stepIcons[index]} /></span><div><h4>{title}</h4><p>{text}</p></div></section>)}</div><div className="student-admission-actions"><a className="button" href="tel:+79122795067">Записаться на встречу →</a><a href="tel:+79122795067">Уточнить условия →</a></div></article>
  </div></div></section>;
}

function ReviewCard({ review, secondary = false }) {
  const initials = review.placeholder ? "✦" : review.name.split(" ").map((part) => part[0]).join("");
  return <article className={`review-card${secondary ? " secondary" : ""}${review.placeholder ? " placeholder" : ""}`}>
    <div className="review-quote">“</div>
    <h3>{review.title}</h3>
    <p>{review.text}</p>
    <div className="review-author"><span>{initials}</span><div><strong>{review.placeholder ? review.role : review.name}</strong><small>{review.placeholder ? "Текст для демонстрации" : review.role}</small></div></div>
  </article>;
}

function Reviews({ items = reviews }) {
  const [index, setIndex] = useState(0);
  const safeIndex = index % items.length;
  useEffect(() => setIndex(0), [items]);
  const previous = () => setIndex((value) => (value - 1 + items.length) % items.length);
  const next = () => setIndex((value) => (value + 1) % items.length);
  const controls = <div className="reviews-controls"><span>{String(safeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span><button onClick={previous} aria-label="Предыдущий отзыв">←</button><button onClick={next} aria-label="Следующий отзыв">→</button></div>;
  return <section className="reviews-section" aria-labelledby="reviews-title">
    <div className="reviews-heading"><div><span>Говорят родители</span><h2 id="reviews-title">Отзывы о школе</h2></div>{controls}</div>
    <div className="reviews-slider" aria-live="polite">
      <ReviewCard key={items[safeIndex].name || items[safeIndex].title} review={items[safeIndex]} />
      <ReviewCard key={items[(safeIndex + 1) % items.length].name || items[(safeIndex + 1) % items.length].title} review={items[(safeIndex + 1) % items.length]} secondary />
    </div>
  </section>;
}

export default function App() {
  const [audience, setAudience] = useState(() => readAudienceFromQuery() || readStoredAudience() || "parent");
  const [hasChosenAudience, setHasChosenAudience] = useState(() => Boolean(readAudienceFromQuery() || readStoredAudience()));
  const content = audienceContent[audience];

  const changeAudience = (nextAudience) => {
    setAudience(nextAudience);
    setHasChosenAudience(true);
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("audience", nextAudience);
    window.history.replaceState({}, "", nextUrl);
  };

  useEffect(() => {
    if (!hasChosenAudience) return;
    try {
      window.localStorage.setItem("fenix-audience", audience);
    } catch {
      // The selector remains usable when storage is unavailable.
    }
  }, [audience, hasChosenAudience]);

  useEffect(() => {
    const syncFromHistory = () => {
      const nextAudience = readAudienceFromQuery() || readStoredAudience();
      setAudience(nextAudience || "parent");
      setHasChosenAudience(Boolean(nextAudience));
    };
    window.addEventListener("popstate", syncFromHistory);
    return () => window.removeEventListener("popstate", syncFromHistory);
  }, []);

  return <main className={`audience-${audience}`}>
    <header className="site-header">
      <a className="brand brand-logo" href="#top" aria-label="Школа Феникс — на главную"><img src="./images/logo-fenix-header.png" alt="Школа Феникс" /></a>
      <nav className="desktop-nav" aria-label="Основная навигация">{navigation.map(([label, href]) => <a key={href} href={href}>{label}<svg className="desktop-nav-underline" viewBox="0 0 120 10" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path pathLength="1" vectorEffect="non-scaling-stroke" d="M2 7 C28 2.5 53 3.2 76 5.8 C94 7.6 107 6.9 118 4.5" /></svg></a>)}</nav>
      <div className="header-actions">{hasChosenAudience && <AudienceSwitch audience={audience} onChange={changeAudience} compact />}<Documents compact /><a className="header-cta" href="tel:+79122795067">Записаться →</a></div>
      <details className="mobile-nav"><summary aria-label="Открыть меню">☰</summary><div className="mobile-nav-panel">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<Documents /><a href="tel:+79122795067">Позвонить в школу</a></div></details>
    </header>

    <section className={`hybrid-hero${audience === "student" ? " student-hero-dynamic" : ""}`} id="top">
      {!hasChosenAudience && <AudienceWelcome onChoose={changeAudience} />}
      {audience === "student" ? <>
        <div className="student-hero-copy">
          <div className="student-hero-eyebrow"><span>+</span> Твой выбор тоже важен</div>
          <h1><span>Школа,</span><span>которую</span><em>можно</em><em>выбрать</em><em>самому</em></h1>
          <p>{content.hero.description}</p>
          <a className="button student-hero-cta" href="#demo-week">Попробовать 5 дней <span aria-hidden="true">→</span></a>
        </div>
        <div className="student-hero-visual">
          <div className="student-hero-photo"><img src="./images/student-demo/student-hero-seniors.jpg" alt="Старшеклассники обсуждают учебное задание" /><StudentHeroBands /></div>
        </div>
      </> : <>
      <div className="hybrid-hero-copy">
        <div className="audience-transition" key={audience}><div className="eyebrow">✦ Частная школа в Екатеринбурге</div><h1>{content.hero.title}<br /><em>{content.hero.accent}</em></h1><p>{content.hero.description}</p>
        <div className="hero-actions"><a className="button button-primary" href="#demo-week">{content.hero.primaryCta}</a><a className="button button-ghost" href="#explore">{content.hero.secondaryCta}</a></div>
        <div className="hero-meta"><span>⌖ Большакова, 109</span><span>До 14 учеников в классе</span><span>3 минуты до Зелёной рощи</span></div>
        </div>
      </div>
      <div className="hybrid-hero-visual"><img src="./images/school-event.jpg" alt="Ученики школы Феникс на занятии" /><div className="hero-demo-card"><span>Демонеделя</span><strong>5 учебных дней</strong><p>Познакомиться со школой до решения о поступлении</p><a href="tel:+79122795067">Уточнить условия →</a></div></div>
      </>}
    </section>

    {audience === "student" && <>
      <StudentHub />
      <StudentStories items={studentReviews} content={content} />
      <StudentNextSteps />
    </>}

    {audience === "parent" && <section className="hybrid-explore" id="explore"><div className="explore-intro"><span>Всё важное в одном месте</span><h2>Выберите, что хотите узнать</h2><p>Страница не уводит в длинную ленту: основная информация меняется внутри одного пространства.</p></div><SchoolTabs content={content} /><Reviews /></section>}

    <section className="hybrid-contact" id="contacts"><div><span>Знакомство со школой</span><h2>Начните с разговора или экскурсии</h2><p>Уточните условия демонедели, свободные места и подходящий формат обучения.</p></div><div className="contact-actions"><a href="tel:+79122795067">☎ +7 912 279-50-67</a><a href="mailto:shkola_fenix@mail.ru">✉ shkola_fenix@mail.ru</a></div></section>

    <footer><div className="footer-brand footer-logo"><img src="./images/logo-fenix-header.png" alt="Школа Феникс" /></div><div className="footer-contact"><a href="https://yandex.ru/maps/?text=Екатеринбург%20Большакова%20109" target="_blank" rel="noreferrer">Екатеринбург, Большакова, 109</a><a href="tel:+79122795067">+7 912 279-50-67</a><a href="mailto:shkola_fenix@mail.ru">shkola_fenix@mail.ru</a></div><div className="footer-legal"><span>ЧУ ДО «Школа Феникс» · ИНН 6671349954</span><span>Лицензия № Л035-01277-66/00961501 от 12.12.2023</span><div className="footer-links"><Documents /><a href="https://fenix-school.ru/policy" target="_blank" rel="noreferrer">Политика обработки данных</a></div></div></footer>
  </main>;
}
