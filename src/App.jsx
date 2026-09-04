import { useEffect, useRef, useState } from "react";
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
  return <div className={`audience-switch${compact ? " compact" : ""}`} aria-label="Выбор аудитории">
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

function StudentExperience({ items }) {
  return <section className="student-experience" aria-labelledby="student-experience-title">
    <div className="student-shell">
      <div className="student-experience-heading"><span>Коротко о главном</span><h2 id="student-experience-title">Как здесь учиться</h2><p>Три вещи, которые определяют обычный учебный день.</p></div>
      <div className="student-experience-grid">{items.map(({ icon, image, title, text }, index) => <article className={`student-advantage-card card-${index + 1}`} key={title}><span className="student-card-number">0{index + 1}</span><span className="student-advantage-icon"><StudentIcon name={icon} /></span><h3>{title}</h3><p>{text}</p>{image && <img className="student-advantage-photo" src={image} alt="" />}</article>)}</div>
    </div>
  </section>;
}

function StudentPeople({ teachers }) {
  return <div className="student-hub-panel student-people"><div className="student-panel-heading"><span>Люди</span><h3>С кем ты будешь учиться</h3><p>В школе важны не только предметы. Важно, кто объясняет их каждый день.</p></div><div className="student-teacher-grid">{teachers.map((teacher, index) => <article key={`${teacher.subject}-${index}`}><img src={teacher.photo} alt="Временное демонстрационное изображение для карточки преподавателя" /><div><span>{teacher.placeholder ? "Demo · данные уточняются" : teacher.subject}</span><h4>{teacher.subject}</h4><strong>{teacher.name}</strong><p>{teacher.shortDescription}</p></div></article>)}</div></div>;
}

function StudentStudy() {
  const [activeProgram, setActiveProgram] = useState(0);
  const [number, ages, title, text] = programs[activeProgram];
  return <div className="student-hub-panel student-study"><div className="student-panel-heading"><span>Учёба</span><h3>Что и как здесь изучают</h3><p>Выбери свой этап — подробности поменяются внутри блока.</p></div><div className="student-program-picker" role="tablist" aria-label="Возрастной этап">{programs.map(([, programAges], index) => <button key={programAges} role="tab" aria-selected={activeProgram === index} className={activeProgram === index ? "active" : ""} onClick={() => setActiveProgram(index)}>{programAges.replace(" классы", "")}</button>)}</div><div className="student-study-layout"><article className="student-program-card"><span>{number} · {ages}</span><h4>{title}</h4><p>{text}</p></article><div className="student-study-points">{audienceContent.student.advantages.map(([pointTitle, pointText]) => <div key={pointTitle}><strong>{pointTitle}</strong><p>{pointText}</p></div>)}</div></div></div>;
}

function StudentLife({ items }) {
  const photos = items.slice(0, 3);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (selected === null) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);
  const move = (step) => setSelected((value) => (value + step + photos.length) % photos.length);
  return <div className="student-hub-panel student-life"><div className="student-panel-heading"><span>Школьная жизнь</span><h3>Как выглядит обычный день</h3><p>Один главный кадр и несколько деталей — без бесконечной фотоленты.</p></div><div className="student-life-grid">{photos.map((photo, index) => <button key={photo.title} className={index === 0 ? "featured" : ""} onClick={() => setSelected(index)}><img src={photo.src} alt={photo.title} style={{ objectPosition: photo.position }} /><span>{photo.title}</span></button>)}</div><p className="student-placeholder-note">Демонстрационные фотографии. В финальной версии будут заменены реальными материалами школы.</p>{selected !== null && <div className="student-lightbox" role="dialog" aria-modal="true" aria-label="Просмотр фотографии" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}><div className="student-lightbox-dialog"><button className="student-lightbox-close" onClick={() => setSelected(null)}>Закрыть ×</button><button className="student-lightbox-arrow previous" onClick={() => move(-1)} aria-label="Предыдущая фотография">←</button><figure><img src={photos[selected].src} alt={photos[selected].title} style={{ objectPosition: photos[selected].position }} /><figcaption>{photos[selected].title}</figcaption></figure><button className="student-lightbox-arrow next" onClick={() => move(1)} aria-label="Следующая фотография">→</button></div></div>}</div>;
}

function StudentMedia({ items }) {
  return <div className="student-hub-panel student-media"><div className="student-panel-heading"><span>Фото и видео</span><h3>Посмотри школу своими глазами</h3><p>Видео, несколько кадров и соцсети — как второй способ увидеть актуальную жизнь школы.</p></div><div className="student-media-layout"><article className="student-media-video"><img src="./images/student-demo/student-demo-talk.jpg" alt="Временная демонстрационная фотография для видеоблока" /><span aria-hidden="true">▶</span><div><small>Видео · placeholder</small><strong>Школа в движении</strong></div></article><div className="student-media-side"><div className="student-media-previews">{items.slice(1, 3).map((item) => <figure key={item.title}><img src={item.src} alt={item.title} style={{ objectPosition: item.position }} /><figcaption>{item.title}</figcaption></figure>)}</div><div className="student-media-socials">{studentSocials.map(({ icon, title, href }) => <a key={title} href={href} aria-disabled={href === "#"} onClick={(event) => href === "#" && event.preventDefault()}><b aria-hidden="true">{icon}</b><span>{title}<small>Ссылка уточняется</small></span><i aria-hidden="true">↗</i></a>)}</div></div></div></div>;
}

const studentHubTabs = [["people", "Люди"], ["study", "Учёба"], ["life", "Школьная жизнь"], ["media", "Фото и видео"]];

function StudentHub() {
  const [active, setActive] = useState("people");
  const panels = { people: <StudentPeople teachers={teachers} />, study: <StudentStudy />, life: <StudentLife items={studentGallery} />, media: <StudentMedia items={studentGallery} /> };
  return <section className="student-hub" id="explore" aria-labelledby="student-hub-title"><div className="student-shell"><div className="student-hub-heading"><span>Феникс изнутри</span><h2 id="student-hub-title">Выбери, что тебе интересно</h2></div><div className="student-hub-tabs" role="tablist" aria-label="Феникс изнутри">{studentHubTabs.map(([id, label]) => <button key={id} id={`student-tab-${id}`} role="tab" aria-selected={active === id} aria-controls={`student-panel-${id}`} className={active === id ? "active" : ""} onClick={() => setActive(id)}>{label}</button>)}</div><div className="student-hub-stage" id={`student-panel-${active}`} role="tabpanel" aria-labelledby={`student-tab-${active}`} key={active}>{panels[active]}</div></div></section>;
}

function StudentNextSteps({ content }) {
  return <section className="student-next" id="demo-week"><div className="student-shell"><div className="student-next-cta"><div><span>Попробовать школу</span><h2>Лучше один день здесь,<br />чем десять страниц описания</h2><p>{content.demoDescription}</p></div><a className="button" href="tel:+79122795067">Попробовать школу 5 дней</a></div><div className="student-practical"><article><span>Стоимость</span><div>{prices.map(([title, price]) => <p key={title}><b>{title}</b><strong>{price}</strong></p>)}</div><small>Вступительный взнос при поступлении — 75 000 ₽.</small></article><article><span>Как поступить</span><ol>{admissionSteps.map(([, title]) => <li key={title}>{title}</li>)}</ol><a href="tel:+79122795067">Уточнить условия →</a></article></div></div></section>;
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

function Reviews({ items = reviews, audience = "parent" }) {
  const [index, setIndex] = useState(0);
  const isStudent = audience === "student";
  const safeIndex = index % items.length;
  useEffect(() => setIndex(0), [items]);
  const previous = () => setIndex((value) => (value - 1 + items.length) % items.length);
  const next = () => setIndex((value) => (value + 1) % items.length);
  const controls = <div className="reviews-controls"><span>{String(safeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span><button onClick={previous} aria-label="Предыдущий отзыв">←</button><button onClick={next} aria-label="Следующий отзыв">→</button></div>;
  if (isStudent) return <section className="reviews-section student-reviews" aria-labelledby="reviews-title">
    <div className="student-reviews-intro"><span>Демо-тексты · заменить реальными</span><h2 id="reviews-title">Как школа звучит глазами учеников</h2><p>Пока это демонстрационные тексты — позже здесь будут реальные отзывы учеников.</p></div>
    <div className="student-review-stage"><div className="reviews-slider" aria-live="polite"><ReviewCard key={items[safeIndex].name || items[safeIndex].title} review={items[safeIndex]} /></div>{controls}</div>
  </section>;
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
      <nav className="desktop-nav" aria-label="Основная навигация">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="header-actions">{hasChosenAudience && <AudienceSwitch audience={audience} onChange={changeAudience} compact />}<Documents compact /><a className="header-cta" href="tel:+79122795067">Записаться →</a></div>
      <details className="mobile-nav"><summary aria-label="Открыть меню">☰</summary><div className="mobile-nav-panel">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<Documents /><a href="tel:+79122795067">Позвонить в школу</a></div></details>
    </header>

    <section className="hybrid-hero" id="top">
      {!hasChosenAudience && <AudienceWelcome onChoose={changeAudience} />}
      <div className="hybrid-hero-copy">
        <div className="audience-transition" key={audience}><div className="eyebrow">✦ Частная школа в Екатеринбурге</div><h1>{content.hero.title}<br /><em>{content.hero.accent}</em></h1><p>{content.hero.description}</p>
        <div className="hero-actions"><a className="button button-primary" href="#demo-week">{content.hero.primaryCta}</a><a className="button button-ghost" href="#explore">{content.hero.secondaryCta}</a></div>
        <div className="hero-meta"><span>⌖ Большакова, 109</span><span>До 14 учеников в классе</span><span>3 минуты до Зелёной рощи</span></div>
        </div>
      </div>
      <div className="hybrid-hero-visual"><img src="./images/school-event.jpg" alt="Ученики школы Феникс на занятии" />{audience === "student" && <div className="student-hero-badge"><span>✦</span> Твой выбор тоже важен</div>}<div className="hero-demo-card"><span>Демонеделя</span><strong>5 учебных дней</strong><p>Познакомиться со школой до решения о поступлении</p><a href="tel:+79122795067">Уточнить условия →</a></div></div>
    </section>

    {audience === "student" && <>
      <StudentExperience items={studentAdvantages} />
      <StudentHub />
      <Reviews items={studentReviews} audience="student" />
      <StudentNextSteps content={content} />
    </>}

    {audience === "parent" && <section className="hybrid-explore" id="explore"><div className="explore-intro"><span>Всё важное в одном месте</span><h2>Выберите, что хотите узнать</h2><p>Страница не уводит в длинную ленту: основная информация меняется внутри одного пространства.</p></div><SchoolTabs content={content} /><Reviews /></section>}

    <section className="hybrid-contact" id="contacts"><div><span>Знакомство со школой</span><h2>Начните с разговора или экскурсии</h2><p>Уточните условия демонедели, свободные места и подходящий формат обучения.</p></div><div className="contact-actions"><a href="tel:+79122795067">☎ +7 912 279-50-67</a><a href="mailto:shkola_fenix@mail.ru">✉ shkola_fenix@mail.ru</a></div></section>

    <footer><div className="footer-brand footer-logo"><img src="./images/logo-fenix-header.png" alt="Школа Феникс" /></div><div className="footer-contact"><a href="https://yandex.ru/maps/?text=Екатеринбург%20Большакова%20109" target="_blank" rel="noreferrer">Екатеринбург, Большакова, 109</a><a href="tel:+79122795067">+7 912 279-50-67</a><a href="mailto:shkola_fenix@mail.ru">shkola_fenix@mail.ru</a></div><div className="footer-legal"><span>ЧУ ДО «Школа Феникс» · ИНН 6671349954</span><span>Лицензия № Л035-01277-66/00961501 от 12.12.2023</span><div className="footer-links"><Documents /><a href="https://fenix-school.ru/policy" target="_blank" rel="noreferrer">Политика обработки данных</a></div></div></footer>
  </main>;
}
