import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 3001;
const defaultOrigins = [
  'https://shinecarwash.onrender.com',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
];
const configuredOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = [...new Set([...defaultOrigins, ...configuredOrigins])];

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const clients = new Set();
const weekdaySlots = ['14:15', '16:15', '18:15'];
const saturdaySlots = ['09:00', '11:00', '13:00', '15:00'];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed'));
    },
  }),
);
app.use(express.json());

const ensureSchema = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS booked_slots (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      service TEXT NOT NULL,
      booking_date DATE NOT NULL,
      booking_time TEXT NOT NULL,
      message TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      UNIQUE (booking_date, booking_time)
    );
  `);
};

const mapBooking = (row) => ({
  id: row.id,
  name: row.name,
  phone: row.phone,
  service: row.service,
  date: row.booking_date,
  time: row.booking_time,
  message: row.message,
  createdAt: row.created_at,
});

const getBookedSlotRows = async () => {
  const result = await pool.query(`
    SELECT
      id,
      name,
      phone,
      service,
      to_char(booking_date, 'YYYY-MM-DD') AS booking_date,
      booking_time,
      message,
      created_at
    FROM booked_slots
    WHERE booking_date >= CURRENT_DATE
    ORDER BY booking_date, booking_time;
  `);

  return result.rows;
};

const getBookedSlots = async () => {
  const rows = await getBookedSlotRows();
  return rows.map((row) => `${row.booking_date}T${row.booking_time}`);
};

const isAllowedSlot = (date, time) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    return false;
  }

  const day = new Date(`${date}T00:00:00Z`).getUTCDay();

  if (day >= 2 && day <= 5) {
    return weekdaySlots.includes(time);
  }

  if (day === 6) {
    return saturdaySlots.includes(time);
  }

  return false;
};

const broadcastBookedSlots = async () => {
  const slots = await getBookedSlots();
  const payload = `data: ${JSON.stringify({ slots })}\n\n`;

  clients.forEach((client) => {
    client.write(payload);
  });
};

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, service: 'shine-booking-api' });
});

app.get('/api/booked-slots', async (_request, response, next) => {
  try {
    const rows = await getBookedSlotRows();
    const bookings = rows.map(mapBooking);
    const slots = rows.map((row) => `${row.booking_date}T${row.booking_time}`);

    response.json({ bookings, slots });
  } catch (error) {
    next(error);
  }
});

app.get('/api/booked-slots/events', async (request, response, next) => {
  try {
    response.writeHead(200, {
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
    });

    clients.add(response);
    response.write(`data: ${JSON.stringify({ slots: await getBookedSlots() })}\n\n`);

    request.on('close', () => {
      clients.delete(response);
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/bookings', async (request, response, next) => {
  const { name, phone, service, date, time, message } = request.body || {};

  if (!name || !phone || !service || !date || !time) {
    response.status(400).json({ success: false, error: 'Missing required fields' });
    return;
  }

  if (!isAllowedSlot(date, time)) {
    response.status(400).json({ success: false, error: 'This appointment slot is not available' });
    return;
  }

  try {
    const result = await pool.query(
      `
        INSERT INTO booked_slots (name, phone, service, booking_date, booking_time, message)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING
          id,
          name,
          phone,
          service,
          to_char(booking_date, 'YYYY-MM-DD') AS booking_date,
          booking_time,
          message,
          created_at;
      `,
      [name, phone, service, date, time, message || null],
    );

    await broadcastBookedSlots();
    response.status(201).json({ success: true, booking: mapBooking(result.rows[0]) });
  } catch (error) {
    if (error.code === '23505') {
      response.status(409).json({
        success: false,
        error: 'This date and time is already booked',
      });
      return;
    }

    next(error);
  }
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ success: false, error: 'Server error' });
});

ensureSchema()
  .then(() => {
    app.listen(port, () => {
      console.log(`Booking API listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database schema.', error);
    process.exit(1);
  });
