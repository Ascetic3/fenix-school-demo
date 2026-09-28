export default function TeacherCard({ teacher, audience }) {
  const copy = teacher[audience];

  return <article className="teacher-card">
    <div className="teacher-card__photo">
      <img
        src={teacher.image}
        alt={teacher.placeholder ? "Демонстрационное фото преподавателя" : teacher.name}
        style={{ objectPosition: teacher.portraitPosition || "50% 38%" }}
      />
      {teacher.placeholder && <span aria-hidden="true">ДЕМО</span>}
    </div>
    <div className="teacher-card__caption">
      <strong>{teacher.name}</strong>
      <span>{teacher.subject}</span>
      <p>{copy.short}</p>
    </div>
  </article>;
}
