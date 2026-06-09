import { Translation } from '../data/translations';

type ScheduleProps = {
  t: Translation['schedule'];
};

function Schedule({ t }: ScheduleProps) {
  const titleParts = t.title.split(' ');
  const highlight = titleParts.pop();

  return (
    <section className="section" id="schedule" aria-labelledby="schedule-title">
      <div className="container narrow">
        <h2 className="section-title" id="schedule-title">
          {titleParts.join(' ')} <span>{highlight}</span>
        </h2>
        <div className="schedule-card">
          {t.days.map((item) => (
            <div className={`schedule-row ${item.closed ? 'is-closed' : ''}`} key={item.day}>
              <span>{item.day}</span>
              <strong>{item.hours}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Schedule;
