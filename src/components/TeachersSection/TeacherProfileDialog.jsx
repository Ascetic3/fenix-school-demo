import { useEffect, useRef } from "react";

const placeholder = "Нужно уточнить у школы.";

function ProfileField({ label, value }) {
  return <div className="teacher-profile__field">
    <h3>{label}</h3>
    <p>{value || placeholder}</p>
  </div>;
}

export default function TeacherProfileDialog({ teacher, onClose, returnFocusRef }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const images = teacher?.images?.length ? teacher.images : teacher ? [{ src: teacher.image, alt: `Фотография преподавателя: ${teacher.name}` }] : [];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (teacher && !dialog.open) {
      const previousOverflow = document.body.style.overflow;
      const closeOnBackdropPress = (event) => {
        const bounds = dialog.getBoundingClientRect();
        const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
        if (outside) onClose();
      };
      document.body.style.overflow = "hidden";
      dialog.showModal();
      document.addEventListener("pointerdown", closeOnBackdropPress, true);
      closeRef.current?.focus();
      return () => {
        document.removeEventListener("pointerdown", closeOnBackdropPress, true);
        document.body.style.overflow = previousOverflow;
        if (dialog.open) dialog.close();
        requestAnimationFrame(() => returnFocusRef.current?.focus());
      };
    }
    if (!teacher && dialog.open) dialog.close();
    return undefined;
  }, [teacher, onClose, returnFocusRef]);

  if (!teacher) return <dialog className="teacher-profile" ref={dialogRef} aria-label="Профиль преподавателя" />;

  return <dialog
    className="teacher-profile"
    ref={dialogRef}
    aria-labelledby="teacher-profile-title"
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    onClick={(event) => { if (event.target === dialogRef.current) onClose(); }}
    onKeyDown={(event) => {
      if (event.key !== "Tab") return;
      const focusable = [...dialogRef.current.querySelectorAll("button, a[href], [tabindex]:not([tabindex='-1'])")].filter((node) => !node.disabled);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }}
  >
    <div className="teacher-profile__chrome">
      <header className="teacher-profile__header">
        <div>
          <span>{teacher.subject}</span>
          <h2 id="teacher-profile-title">{teacher.name}</h2>
          <p>{teacher.role || teacher.subject}</p>
        </div>
        <button ref={closeRef} type="button" className="teacher-profile__close" aria-label="Закрыть профиль" onClick={onClose}>×</button>
      </header>
      <div className="teacher-profile__body">
        {teacher.placeholder && <p className="teacher-profile__notice">Демонстрационные материалы. Имя, фотографию и сведения о преподавателе необходимо подтвердить у школы.</p>}
        <div className="teacher-profile__gallery" aria-label="Фотографии преподавателя">
          {images.map((image) => <img key={image.src} src={image.src} alt={image.alt || `Фотография преподавателя: ${teacher.name}`} />)}
        </div>
        <div className="teacher-profile__content">
          <p className="teacher-profile__lead">{teacher.parent.short}</p>
          <section>
            <h3>О преподавателе</h3>
            <ProfileField label="Биография" value={teacher.profile?.bio} />
            <ProfileField label="Образование" value={teacher.profile?.education} />
            <ProfileField label="Опыт и специализация" value={teacher.profile?.experience} />
          </section>
          <section><h3>Подход к преподаванию</h3><p>{teacher.profile?.teachingApproach || "Опишите подход преподавателя к работе с учениками."}</p></section>
          <section><h3>Опыт и достижения</h3><p>{teacher.profile?.achievements || placeholder}</p></section>
          <section><h3>Вне школы</h3><p>{teacher.profile?.hobbies || "Нужно уточнить у преподавателя."}</p></section>
          <blockquote><strong>Что для меня важно в работе с детьми</strong><p>{teacher.profile?.quote || "Здесь может быть короткая личная цитата преподавателя."}</p></blockquote>
        </div>
      </div>
      <footer className="teacher-profile__footer">
        <a href="tel:+79122795067">Записаться на экскурсию <span aria-hidden="true">→</span></a>
      </footer>
    </div>
  </dialog>;
}
