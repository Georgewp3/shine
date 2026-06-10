import { FormEvent, useEffect, useMemo, useState } from 'react';
import logo from '../assets/logo.webp';
import { ServiceText, Translation } from '../data/translations';

type BookingState = {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
};

type CalendarDay = {
  iso: string;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isAvailable: boolean;
  isSelected: boolean;
};

const initialState: BookingState = {
  name: '',
  phone: '',
  service: '',
  date: '',
  time: '',
  message: '',
};

const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

type BookingFormProps = {
  t: Translation['booking'];
  services: ServiceText[];
};

const weekdayOrder = [1, 2, 3, 4, 5, 6, 0];

const pad = (value: number) => String(value).padStart(2, '0');

const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);

const addMonths = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);

const formatTimeLabel = (value: string) => {
  const [hourValue, minute] = value.split(':').map(Number);
  const suffix = hourValue >= 12 ? 'PM' : 'AM';
  const hour = hourValue % 12 || 12;
  return `${hour}:${pad(minute)} ${suffix}`;
};

const getSlotKey = (date: string, time: string) => `${date}T${time}`;

const normalizeBookedSlots = (slots: unknown) =>
  Array.isArray(slots) ? slots.filter((slot): slot is string => typeof slot === 'string') : [];

const fetchBookedSlots = async () => {
  if (!apiBaseUrl) {
    throw new Error('Booking API is not configured.');
  }

  const response = await fetch(`${apiBaseUrl}/api/booked-slots`);

  if (!response.ok) {
    throw new Error('Failed to fetch booked slots.');
  }

  const data = await response.json();
  return normalizeBookedSlots(data.slots);
};

const createBooking = async (booking: BookingState) => {
  if (!apiBaseUrl) {
    throw new Error('Booking API is not configured.');
  }

  const response = await fetch(`${apiBaseUrl}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: booking.date,
      time: booking.time,
      name: booking.name,
      phone: booking.phone,
      service: booking.service,
      message: booking.message,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 409) {
    const slotKey = getSlotKey(booking.date, booking.time);
    const slots = normalizeBookedSlots(data.slots);
    const latestSlots = slots.length > 0 ? slots : await fetchBookedSlots().catch(() => [slotKey]);

    return { ok: false, conflict: true, slots: latestSlots };
  }

  if (!response.ok) {
    throw new Error('Failed to create booking.');
  }

  return { ok: true, conflict: false, slots: normalizeBookedSlots(data.slots) };
};

type BookingResult = Awaited<ReturnType<typeof createBooking>>;

const getWorkingWindow = (date: Date) => {
  const day = date.getDay();

  if (day >= 2 && day <= 5) {
    return { start: 14 * 60 + 15, end: 20 * 60 };
  }

  if (day === 6) {
    return { start: 9 * 60, end: 16 * 60 };
  }

  return null;
};

const getAppointmentTimes = (date: Date | null) => {
  if (!date) {
    return [];
  }

  const day = date.getDay();

  if (day >= 2 && day <= 5) {
    return ['14:15', '16:15', '18:15'];
  }

  if (day === 6) {
    return ['09:00', '11:00', '13:00', '15:00'];
  }

  return [];
};

const getTimeSlots = (date: Date | null, bookedSlots: string[]) => {
  const dateIso = date ? toIsoDate(date) : '';
  const slots = getAppointmentTimes(date);

  return slots.map((value) => {
    const isBooked = Boolean(dateIso && bookedSlots.includes(getSlotKey(dateIso, value)));

    return {
      value,
      label: formatTimeLabel(value),
      isAvailable: !isBooked,
      isBooked,
    };
  });
};

function BookingForm({ t, services }: BookingFormProps) {
  const [form, setForm] = useState<BookingState>(initialState);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(new Date()));
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;

    if (!apiBaseUrl) {
      setError('Booking API is not configured.');
      return () => {
        isMounted = false;
      };
    }

    fetchBookedSlots()
      .then((slots) => {
        if (isMounted) {
          setBookedSlots(slots);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Booking API is not configured.');
        }
      });

    const events = new EventSource(`${apiBaseUrl}/api/booked-slots/events`);

    events.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (isMounted) {
          setBookedSlots(normalizeBookedSlots(data.slots));
        }
      } catch {
        // Ignore malformed live updates and keep the last known slot list.
      }
    };

    events.onerror = () => {
      events.close();
    };

    return () => {
      isMounted = false;
      events.close();
    };
  }, []);

  const today = useMemo(() => startOfDay(new Date()), []);
  const selectedDate = form.date ? startOfDay(new Date(`${form.date}T00:00:00`)) : null;
  const calendarDays = useMemo<CalendarDay[]>(() => {
    const monthStart = startOfMonth(visibleMonth);
    const gridStart = new Date(monthStart);
    const daysFromMonday = (monthStart.getDay() + 6) % 7;
    gridStart.setDate(monthStart.getDate() - daysFromMonday);

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(gridStart);
      date.setDate(gridStart.getDate() + index);
      const dayStart = startOfDay(date);
      const iso = toIsoDate(date);
      const isPast = dayStart < today;
      const isToday = dayStart.getTime() === today.getTime();
      const isCurrentMonth = date.getMonth() === visibleMonth.getMonth();
      const isAvailable =
        !isPast &&
        Boolean(getWorkingWindow(date)) &&
        getTimeSlots(date, bookedSlots).some((slot) => slot.isAvailable);

      return {
        iso,
        dayNumber: date.getDate(),
        isCurrentMonth,
        isToday,
        isAvailable,
        isSelected: form.date === iso,
      };
    });
  }, [bookedSlots, form.date, today, visibleMonth]);

  const timeSlots = useMemo(() => getTimeSlots(selectedDate, bookedSlots), [bookedSlots, selectedDate]);
  const canGoToPreviousMonth =
    visibleMonth.getFullYear() > today.getFullYear() || visibleMonth.getMonth() > today.getMonth();

  const updateField = (field: keyof BookingState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const selectDate = (day: CalendarDay) => {
    if (!day.isAvailable) {
      return;
    }

    setForm((current) => ({
      ...current,
      date: day.iso,
      time: '',
    }));
    setError('');
  };

  const selectTime = (time: string, isAvailable: boolean) => {
    if (!isAvailable) {
      return;
    }

    updateField('time', time);
    setError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setFeedback('');

    if (!apiBaseUrl) {
      setError('Booking API is not configured.');
      return;
    }

    if (!form.name || !form.phone || !form.service || !form.date || !form.time) {
      setError(t.error);
      return;
    }

    const slotKey = getSlotKey(form.date, form.time);

    if (bookedSlots.includes(slotKey)) {
      setError(`${t.time} ${t.unavailable}.`);
      setForm((current) => ({ ...current, time: '' }));
      return;
    }

    let bookingResult: BookingResult;

    try {
      setIsSubmitting(true);
      bookingResult = await createBooking(form);
    } catch {
      setError(apiBaseUrl ? t.error : 'Booking API is not configured.');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);

    if (!bookingResult.ok) {
      setBookedSlots(bookingResult.slots);
      setError('This date and time is already booked. Please choose another slot.');
      setForm((current) => ({ ...current, time: '' }));
      return;
    }

    const text = t.whatsappMessage({
      ...form,
      time: formatTimeLabel(form.time),
    });

    setBookedSlots((current) => [...new Set([...current, slotKey])]);
    setForm((current) => ({ ...current, date: '', time: '' }));
    setFeedback(t.success);
    window.open(`https://wa.me/35799668535?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  return (
    <section className="section" id="book" aria-labelledby="book-title">
      <div className="container booking-layout">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h2 id="book-title">{t.title}</h2>
          <p className="lead">{t.intro}</p>
        </div>
        <form className="booking-form" onSubmit={handleSubmit} noValidate>
          <label>
            {t.name}
            <input
              type="text"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              autoComplete="name"
              required
            />
          </label>
          <label>
            {t.phone}
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              autoComplete="tel"
              required
            />
          </label>
          <label>
            {t.service}
            <select
              value={form.service}
              onChange={(event) => updateField('service', event.target.value)}
              required
            >
              <option value="">{t.servicePlaceholder}</option>
              {services.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </label>

          <fieldset className="calendar-picker">
            <legend className="sr-only">{t.calendarTitle}</legend>
            <div className="calendar-brand">
              <img src={logo} alt="Shine Argyrou CarWash logo" />
              <h3>Shine Argyrou CarWash</h3>
              <p>{t.calendarTitle}</p>
              <span>{t.chooseDateFirst}</span>
            </div>
            <div className="calendar-toolbar">
              <button
                className="calendar-nav"
                type="button"
                onClick={() => setVisibleMonth((current) => addMonths(current, -1))}
                disabled={!canGoToPreviousMonth}
                aria-label={t.previousMonth}
              >
                &lt;
              </button>
              <strong>
                {t.months[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}
              </strong>
              <button
                className="calendar-nav"
                type="button"
                onClick={() => setVisibleMonth((current) => addMonths(current, 1))}
                aria-label={t.nextMonth}
              >
                &gt;
              </button>
            </div>
            <div className="calendar-grid" role="grid" aria-label={t.calendarTitle}>
              {weekdayOrder.map((weekdayIndex) => (
                <span className="calendar-weekday" key={weekdayIndex}>
                  {t.weekdays[weekdayIndex]}
                </span>
              ))}
              {calendarDays.map((day) => (
                <button
                  className={`calendar-day ${day.isCurrentMonth ? '' : 'is-muted'} ${
                    day.isAvailable ? 'is-available' : 'is-unavailable'
                  } ${day.isToday ? 'is-today' : ''} ${day.isSelected ? 'is-selected' : ''}`}
                  type="button"
                  key={day.iso}
                  onClick={() => selectDate(day)}
                  disabled={!day.isAvailable}
                  aria-label={`${day.iso} ${day.isAvailable ? t.available : t.unavailable}`}
                  aria-pressed={day.isSelected}
                >
                  {day.dayNumber}
                </button>
              ))}
            </div>
            <div className="calendar-legend" aria-hidden="true">
              <span>
                <i className="legend-dot today" /> {t.today}
              </span>
              <span>
                <i className="legend-dot available" /> {t.available}
              </span>
              <span>
                <i className="legend-dot unavailable" /> {t.unavailable}
              </span>
            </div>
          </fieldset>

          <fieldset className="time-picker">
            <legend>{t.time}</legend>
            <p className="selected-summary">
              {form.date ? `${t.selectedDate}: ${form.date}` : t.chooseDateFirst}
              {form.time ? ` - ${t.selectedTime}: ${formatTimeLabel(form.time)}` : ''}
            </p>
            <div className="time-grid">
              {timeSlots.map((slot) => (
                <button
                  className={`time-slot ${slot.isAvailable ? 'is-available' : 'is-unavailable'} ${
                    form.time === slot.value ? 'is-selected' : ''
                  } ${slot.isBooked ? 'is-booked' : ''}`}
                  type="button"
                  key={slot.value}
                  onClick={() => selectTime(slot.value, slot.isAvailable)}
                  disabled={!slot.isAvailable || !form.date}
                  aria-pressed={form.time === slot.value}
                >
                  <span className="time-slot-main">
                    <span className="time-slot-icon" aria-hidden="true" />
                    <span>{slot.label}</span>
                  </span>
                  <span className="time-slot-status">
                    <span aria-hidden="true">{slot.isAvailable ? '✓' : '×'}</span>
                    {slot.isAvailable ? t.available : t.unavailable}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <label>
            {t.message}
            <textarea
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
              rows={5}
            />
          </label>
          {error && <p className="form-message error">{error}</p>}
          {feedback && <p className="form-message success">{feedback}</p>}
          <button className="button button-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Booking...' : t.submit}
          </button>
          <p className="booking-note">{t.note}</p>
        </form>
      </div>
    </section>
  );
}

export default BookingForm;
