import { useEffect, useRef, useState } from "react";
import {
  admissionSteps, audienceContent, demoWeekFields, documents, navigation, prices, programs, reviews,
  studentAdvantages, studentGallery, studentReviews, studentSocials,
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

function StudentExperience({ items }) {
  return <section className="student-experience" aria-labelledby="student-experience-title">
    <div className="student-experience-heading"><span>Твой взгляд тоже важен</span><h2 id="student-experience-title">Как ощущается учёба в «Фениксе»</h2><p>Те же факты о школе — с точки зрения человека, которому предстоит учиться здесь каждый день.</p></div>
    <div className="student-experience-grid">{items.map(({ icon, title, text }) => <article key={title}><span className="student-advantage-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
  </section>;
}

function StudentGallery({ items }) {
  return <section className="student-gallery" aria-labelledby="student-gallery-title">
    <div className="student-section-heading"><span>Школьная жизнь</span><h2 id="student-gallery-title">Посмотри, как выглядит школьная жизнь</h2><p>Не только программа и расписание — важно увидеть людей, пространство и обычный день.</p></div>
    <div className="student-gallery-grid">{items.map(({ src, title, label, position }, index) => <figure key={`${title}-${index}`}>
      <img src={src} alt="Демонстрационный кадр из текущей фототеки школы" style={{ objectPosition: position }} />
      <div><span>{label}</span><figcaption>{title}</figcaption></div>
    </figure>)}</div>
    <p className="student-placeholder-note">Для демонстрации раздела. В финальной версии здесь будут реальные фото и видео школы.</p>
  </section>;
}

function StudentConnect() {
  return <section className="student-connect" aria-label="Видео и социальные сети школы">
    <article className="student-video-card">
      <img src="./images/school-event.jpg" alt="Ученики на занятии — фон демонстрационного видеоблока" />
      <div className="student-video-play" aria-hidden="true">▶</div>
      <div className="student-video-copy"><span>Видео · placeholder</span><h2>Посмотреть школу в движении</h2><p>Здесь можно разместить короткое видео о школьной жизни.</p></div>
    </article>
    <aside className="student-socials">
      <span>За пределами сайта</span><h2>Посмотри, чем школа живёт сейчас</h2><p>На сайте — основная информация, а в соцсетях можно увидеть повседневную жизнь школы, события и фотографии.</p>
      <div>{studentSocials.map(({ icon, title, text, href }) => <a key={title} href={href} aria-disabled={href === "#"} onClick={(event) => href === "#" && event.preventDefault()}><b aria-hidden="true">{icon}</b><span><strong>{title}</strong><small>{text}</small></span><i>↗</i></a>)}</div>
      <small>Ссылки появятся после подтверждения официальных аккаунтов школы.</small>
    </aside>
  </section>;
}

function StudentProof() {
  return <section className="student-proof">
    <div><span>Лучший способ проверить</span><h2>Не верь сайту на слово</h2><p>Посмотри фотографии, загляни в соцсети и приходи на пробные дни. Лучше провести здесь один обычный учебный день, чем читать десять страниц описания.</p></div>
    <a className="button button-dark" href="#demo-week">Попробовать школу →</a>
  </section>;
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
  return <section className={`reviews-section${isStudent ? " student-reviews" : ""}`} aria-labelledby="reviews-title">
    <div className="reviews-heading"><div><span>{isStudent ? "Демо-тексты · заменить реальными" : "Говорят родители"}</span><h2 id="reviews-title">{isStudent ? "Как школа может звучать глазами учеников" : "Отзывы о школе"}</h2></div><div className="reviews-controls"><span>{String(safeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span><button onClick={previous} aria-label="Предыдущий отзыв">←</button><button onClick={next} aria-label="Следующий отзыв">→</button></div></div>
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
      <div className="hybrid-hero-visual"><img src="./images/school-event.jpg" alt="Ученики школы Феникс на занятии" /><div className="hero-demo-card"><span>Демонеделя</span><strong>5 учебных дней</strong><p>Познакомиться со школой до решения о поступлении</p><a href="tel:+79122795067">Уточнить условия →</a></div></div>
    </section>

    {audience === "student" && <>
      <StudentExperience items={studentAdvantages} />
      <StudentGallery items={studentGallery} />
      <StudentConnect />
      <StudentProof />
      <Reviews items={studentReviews} audience="student" />
    </>}

    <section className={`hybrid-explore${audience === "student" ? " student-details" : ""}`} id="explore"><div className="explore-intro"><span>Всё важное в одном месте</span><h2>Выберите, что хотите узнать</h2><p>Страница не уводит в длинную ленту: основная информация меняется внутри одного пространства.</p></div><SchoolTabs content={content} />{audience === "parent" && <Reviews />}</section>

    <section className="hybrid-contact" id="contacts"><div><span>Знакомство со школой</span><h2>Начните с разговора или экскурсии</h2><p>Уточните условия демонедели, свободные места и подходящий формат обучения.</p></div><div className="contact-actions"><a href="tel:+79122795067">☎ +7 912 279-50-67</a><a href="mailto:shkola_fenix@mail.ru">✉ shkola_fenix@mail.ru</a></div></section>

    <footer><div className="footer-brand footer-logo"><img src="./images/logo-fenix-header.png" alt="Школа Феникс" /></div><div className="footer-contact"><a href="https://yandex.ru/maps/?text=Екатеринбург%20Большакова%20109" target="_blank" rel="noreferrer">Екатеринбург, Большакова, 109</a><a href="tel:+79122795067">+7 912 279-50-67</a><a href="mailto:shkola_fenix@mail.ru">shkola_fenix@mail.ru</a></div><div className="footer-legal"><span>ЧУ ДО «Школа Феникс» · ИНН 6671349954</span><span>Лицензия № Л035-01277-66/00961501 от 12.12.2023</span><div className="footer-links"><Documents /><a href="https://fenix-school.ru/policy" target="_blank" rel="noreferrer">Политика обработки данных</a></div></div></footer>
  </main>;
}
