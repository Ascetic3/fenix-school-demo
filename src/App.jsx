import { useEffect, useRef, useState } from "react";
import PhoenixHeroV2 from "./components/PhoenixHeroV2";
import StudentHeroV2 from "./components/StudentHeroV2";
import TeachersSection from "./components/TeachersSection/TeachersSection";
import {
  admissionSteps, audienceContent, demoWeekFields, documents, navigation, prices, programs, reviews,
  studentAdvantages, studentGallery, studentNews, studentReviews, studentSocials,
} from "./content";

const audienceIds = ["parent", "student"];
const ctaWingUrl = new URL("./assets/cta-wing.svg", import.meta.url).href;
const ctaShapeUrl = new URL("./assets/cta-shape.svg", import.meta.url).href;

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

const tabs = [["programs", "Обучение"], ["why", "Почему Феникс"], ["teachers", "Педагоги"], ["pricing", "Стоимость"], ["admission", "Поступление"]];

const programVisuals = [
  { src: "./images/school-event.jpg", alt: "Ученики начальных классов на занятии", position: "50% 48%" },
  { src: "./images/student-demo/student-demo-class.jpg", alt: "Ученики работают в классе", position: "52% 58%" },
  { src: "./images/student-demo/student-demo-discussion.jpg", alt: "Ученики обсуждают учебное задание", position: "50% 48%" },
  { src: "./images/student-demo/student-demo-talk.jpg", alt: "Старшеклассники общаются в школьном пространстве", position: "50% 48%" },
];

function Programs() {
  const [activeStage, setActiveStage] = useState(0);
  const [number, ages, title, text] = programs[activeStage];
  const visual = programVisuals[activeStage];
  const selectStage = (index) => setActiveStage((index + programs.length) % programs.length);

  return <section className="tab-panel programs-panel">
    <div className="programs-overview"><span>Образовательный маршрут</span><h2>От первых букв<br />до выбора профессии</h2><p>Выберите возрастной этап. Здесь собрана программа без переходов на отдельные страницы.</p></div>
    <div className="program-stage-selector" role="tablist" aria-label="Этапы образовательного маршрута">
      {programs.map(([stageNumber, stageAges, stageTitle], index) => <button
        key={stageNumber}
        type="button"
        role="tab"
        aria-selected={activeStage === index}
        aria-controls="active-program-stage"
        className={activeStage === index ? "active" : ""}
        onClick={() => selectStage(index)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") selectStage(index + 1);
          if (event.key === "ArrowLeft") selectStage(index - 1);
        }}
      ><span>{stageNumber}</span><strong>{stageTitle}</strong><small>{stageAges}</small></button>)}
    </div>
    <article className="program-feature-card" id="active-program-stage" key={number} role="tabpanel">
      <div className="program-feature-card__image"><img src={visual.src} alt={visual.alt} style={{ objectPosition: visual.position }} /></div>
      <div className="program-feature-card__content">
        <div className="program-feature-card__meta"><span>{number}</span><small>{ages}</small></div>
        <h3>{title}</h3>
        <p>{text}</p>
        <button type="button" className="program-feature-card__arrow" aria-label="Показать следующий образовательный этап" onClick={() => selectStage(activeStage + 1)}><span aria-hidden="true">→</span></button>
      </div>
    </article>
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

function SchoolTabs({ content, audience }) {
  const [active, setActive] = useState("programs");
  const panels = { programs: <Programs />, why: <Why content={content} />, teachers: <TeachersSection audience={audience} />, pricing: <Pricing />, admission: <Admission /> };
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


function StudentExperience({ items }) {
  return <section className="student-experience student-experience-embedded is-revealed" aria-labelledby="student-experience-title">
    <div className="student-shell">
      <div className="student-experience-heading"><span>Учёба</span><h2 id="student-experience-title">Как здесь учиться</h2><p>Три вещи, которые определяют обычный учебный день.</p></div>
      <div className="student-experience-grid">{items.map(({ icon, image, title, text }, index) => <article className={`student-advantage-card card-${index + 1}`} key={title}>
        <span className="student-card-number">0{index + 1}</span>
        <span className="student-advantage-icon"><StudentIcon name={icon} /></span>
        <h3>{index === 1 ? <><span className="student-study-title-line">{title.split(" ").slice(0, 2).join(" ")}</span>{" "}<span className="student-study-title-line">{title.split(" ")[2]}</span>{" "}<span className="student-study-title-line">{title.split(" ").slice(3).join(" ")}</span></> : title}</h3>
        <p>{text}</p>
        {(image || index === 1) && <img className={`student-advantage-photo${!image ? " student-study-added-photo" : ""}`} src={image || "./images/student-demo/teachers/teacher-russian-demo.png"} alt="" />}
          <span className="student-study-arrow" aria-hidden="true">→</span>
          {index === 0 && <svg className="student-study-spark" viewBox="0 0 48 48" aria-hidden="true" focusable="false"><path d="M24 2 C27.5 14.5 30 17 42 24 C30 31 27.5 33.5 24 46 C20.5 33.5 18 31 6 24 C18 17 20.5 14.5 24 2 Z" /></svg>}
      </article>)}</div>
    </div>
  </section>;
}

function StudentNews({ items }) {
  return <div className="student-hub-panel student-news">
    <div className="student-panel-heading"><span>Новости школы</span><h3>Что происходит<br />в школе</h3><p>Здесь мы делимся новостями, событиями, анонсами и важными объявлениями из жизни Феникса.</p></div>
    <div className="student-news-grid">{items.map((item, index) =>
      <a className={`student-news-card${index === 0 ? " is-featured" : ""}`} href={`#news/${item.slug}`} data-news-id={item.id} key={item.id} aria-label={`Читать: ${item.title}`}>
        <img src={item.image} alt={item.imageAlt} style={{ objectPosition: item.imagePosition }} />
        <div className="student-news-copy">
          <div className="student-news-meta"><time dateTime={item.date}>{item.dateLabel}</time><span>{item.category}</span></div>
          <h4>{item.title}</h4><p>{item.excerpt}</p>
          <span className="student-news-read"><i aria-hidden="true">→</i>Читать</span>
        </div>
      </a>
    )}</div>
  </div>;
}

function StudentMedia({ items }) {
  return <div className="student-hub-panel student-media"><div className="student-panel-heading"><span>Фото и видео</span><h3>Посмотри школу своими глазами</h3><p>Видео, несколько кадров и соцсети — как второй способ увидеть актуальную жизнь школы.</p></div><div className="student-media-layout"><article className="student-media-video"><img src="./images/student-demo/student-demo-talk.jpg" alt="Временная демонстрационная фотография для видеоблока" /><span aria-hidden="true">▶</span><div><small>Видео · placeholder</small><strong>Школа в движении</strong></div></article><div className="student-media-side"><div className="student-media-previews">{items.slice(1, 3).map((item) => <figure key={item.title}><img src={item.src} alt={item.title} style={{ objectPosition: item.position }} /><figcaption>{item.title}</figcaption></figure>)}</div><div className="student-media-socials">{studentSocials.map(({ icon, title, href }) => <a key={title} href={href} aria-disabled={href === "#"} onClick={(event) => href === "#" && event.preventDefault()}><b aria-hidden="true">{icon}</b><span>{title}<small>Ссылка уточняется</small></span><i aria-hidden="true">↗</i></a>)}</div></div></div></div>;
}

const studentHubTabs = [["people", "Люди"], ["study", "Учёба"], ["life", "Новости"], ["media", "Фото и видео"]];

function StudentHub({ audience }) {
  const [active, setActive] = useState("people");
  const [direction, setDirection] = useState("forward");
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);
  const activeIndex = studentHubTabs.findIndex(([id]) => id === active);
  const panels = { people: <TeachersSection audience={audience} />, study: <StudentExperience items={studentAdvantages} />, life: <StudentNews items={studentNews} />, media: <StudentMedia items={studentGallery} /> };

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
  return <section ref={sectionRef} className={`student-hub${isRevealed ? " is-revealed" : ""}`} id="explore" aria-labelledby="student-hub-title">
    <div className="student-shell">
      <div className="student-hub-heading"><span>Феникс изнутри</span><h2 id="student-hub-title">Выбери, что тебе<br />интересно</h2></div>
      <div className="student-hub-tabs" role="tablist" aria-label="Феникс изнутри" style={{ "--hub-index": activeIndex }}>
        {studentHubTabs.map(([id, label], index) => <button key={id} id={`student-tab-${id}`} role="tab" aria-selected={active === id} aria-controls={`student-panel-${id}`} className={active === id ? "active" : ""} onClick={() => selectTab(id, index)}><span className="student-hub-tab-label">{label}</span></button>)}
      </div>
      <div className="student-hub-stage-reveal"><div className={`student-hub-stage direction-${direction}`} id={`student-panel-${active}`} role="tabpanel" aria-labelledby={`student-tab-${active}`} key={active}>{panels[active]}</div></div>
    </div>
  </section>;
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
    <div className="student-stories-heading"><div><span>Истории учеников</span><h2 id="student-stories-title">Настоящие люди.<br />Настоящие истории.</h2></div><p>В Фениксе учатся такие же ребята, как ты. Они рассказывают, что на самом деле значит быть здесь — учиться, находить друзей, развиваться и верить в себя.</p></div>
    <div className="student-stories-grid">
      <div className="student-stories-photo-layer"><div className="student-stories-photo-backing" aria-hidden="true"><div className="student-backing-spray student-backing-red" /><div className="student-backing-spray student-backing-peach" /></div><figure className="student-stories-photo"><img src={photo.src} alt={photo.title} style={{ objectPosition: photo.position }} /></figure></div>
      <article className="student-story-review" aria-live="polite" key={review.title}>
        <div className="student-story-quote" aria-hidden="true">“</div><h3>{review.title === "В маленьком классе тебя реально замечают" ? review.title.split(/(?<=маленьком) |(?<=реально) /).map((line, lineIndex) => <span className="student-story-title-line" key={line}>{lineIndex > 0 && " "}{line}</span>) : review.title}</h3><p>{review.text}</p>
        <div className="student-story-footer"><div className="student-story-author"><span><StudentIcon name="group" /></span><div><strong>{review.role}</strong><small>Текст для демонстрации</small></div></div><div className="reviews-controls"><span>{safeIndex + 1} / {carouselItems.length}</span><button onClick={previous} aria-label="Предыдущий отзыв">←</button><button onClick={next} aria-label="Следующий отзыв">→</button></div></div>
        <div className="student-story-static-controls" aria-label="Навигация отзывов — статичный макет"><button type="button" disabled aria-label="Предыдущий отзыв">←</button><span>1 / 4</span><button type="button" disabled aria-label="Следующий отзыв">→</button></div>
      </article>
      <article className="student-story-cta" id="demo-week"><div className="student-backing-spray student-backing-trial" aria-hidden="true" /><span>Попробовать школу</span><h3>5 дней<br />в Фениксе</h3><p>{content.demoDescription}</p><ul>
        <li><span><StudentIcon name="dialog" /></span>Посетишь настоящие уроки</li>
        <li><span><StudentIcon name="group" /></span>Познакомишься с учителями и ребятами</li>
        <li><span><StudentIcon name="target" /></span>Поймёшь, подходит ли тебе формат</li>
      </ul><a className="button" href="tel:+79122795067">Попробовать 5 дней →</a></article>
    </div>
    <div className="student-stories-thumbnails" aria-label="Фотографии историй — статичный макет">{[photo, ...studentGallery.filter(({ src }) => src !== photo.src)].slice(0, 4).map((image, imageIndex) => <div className={`student-story-thumbnail${imageIndex === 0 ? " is-active" : ""}`} key={image.src}><img src={image.src} alt={image.title} style={{ objectPosition: image.position }} loading="lazy" /></div>)}<span className="student-stories-more">Больше<br />историй →</span></div>
  </div></section>;
}

function StudentNextSteps() {
  const priceIcons = ["spark", "dialog", "target"];
  const stepIcons = ["dialog", "group", "target", "spark"];
  return <section className="student-next"><div className="student-shell"><div className="student-practical">
    <article className="student-pricing-card"><span>Стоимость</span><h3>Инвестиция<br />в большое будущее</h3><div className="student-price-grid">{prices.map(([title, price, period, details], index) => <section className="student-price-card" key={title}><span className="student-price-icon"><StudentIcon name={priceIcons[index]} /></span><h4>{title}</h4><p>{details[0]}</p><strong>{price}</strong><small>{period}</small></section>)}</div><small className="student-entry-fee">Вступительный взнос при поступлении — 75 000 ₽.</small></article>
    <article className="student-admission-card"><span>Как поступить</span><h3>Простой путь<br />к большим возможностям</h3><div className="student-admission-path"><span className="student-admission-accent" aria-hidden="true"><StudentIcon name="spark" /></span>{admissionSteps.map(([number, title, text], index) => <section key={number}><b>{number}</b><span className="student-admission-icon"><StudentIcon name={stepIcons[index]} /></span><div><h4>{title}</h4><p>{text}</p></div></section>)}</div><div className="student-admission-actions"><a className="button" href="tel:+79122795067">Записаться на встречу →</a><a href="tel:+79122795067">Уточнить условия →</a></div></article>
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

    {audience === "student" ? <StudentHeroV2 description={content.hero.description} /> : <PhoenixHeroV2
      ctaLabel={content.hero.primaryCta}
      welcome={!hasChosenAudience && <AudienceWelcome onChoose={changeAudience} />}
    />}

    {audience === "student" && <>
      <StudentHub audience={audience} />
      <StudentStories items={studentReviews} content={content} />
      <StudentNextSteps />
    </>}

    {audience === "parent" && <section className="hybrid-explore" id="explore"><div className="explore-intro"><span>Всё важное в одном месте</span><h2>Выберите, что хотите узнать</h2><p>Страница не уводит в длинную ленту: основная информация меняется внутри одного пространства.</p></div><SchoolTabs content={content} audience={audience} /><Reviews /></section>}

    <section className="hybrid-contact final-contact" id="contacts">
      <svg className="final-contact-shape" viewBox="0 0 1600 520" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <image href={ctaShapeUrl} width="1600" height="520" />
      </svg>
      <div className="final-contact-copy"><span>Знакомство со школой</span><h2>Начните с разговора<br />или экскурсии</h2><p>Уточните условия демонедели, свободные места и подходящий формат обучения.</p></div>
      <div className="final-contact-wing" aria-hidden="true">{ctaWingUrl && <img src={ctaWingUrl} alt="" />}</div>
      <div className="contact-actions"><a href="tel:+79122795067"><span aria-hidden="true">☎</span>+7 912 279-50-67</a><a href="mailto:shkola_fenix@mail.ru"><span aria-hidden="true">✉</span>shkola_fenix@mail.ru</a><a className="final-contact-cta" href="tel:+79122795067">Записаться на экскурсию <span aria-hidden="true">→</span></a></div>
    </section>

    <footer className="final-footer">
      <div className="final-footer-brand"><div className="footer-brand footer-logo"><img src="./images/logo-fenix-header.png" alt="Школа Феникс" /></div><p>Сильные дети.<br />Осознанное будущее.</p></div>
      <div className="footer-contact"><h3>Контакты</h3><a href="https://yandex.ru/maps/?text=Екатеринбург%20Большакова%20109" target="_blank" rel="noreferrer">Екатеринбург, Большакова, 109</a><a href="tel:+79122795067">+7 912 279-50-67</a><a href="mailto:shkola_fenix@mail.ru">shkola_fenix@mail.ru</a></div>
      <div className="footer-legal"><h3>Документы</h3><span>Лицензия № Л035-01277-66/00961501<br />от 12.12.2023</span><a href="https://fenix-school.ru/policy" target="_blank" rel="noreferrer">Политика обработки данных</a><div className="footer-links"><Documents /></div></div>
      <div className="final-footer-bottom"><span>ЧУ ДО «Школа Феникс» · ИНН 6671349954</span><span>© {new Date().getFullYear()} Школа Феникс. Все права защищены.</span></div>
    </footer>
  </main>;
}
