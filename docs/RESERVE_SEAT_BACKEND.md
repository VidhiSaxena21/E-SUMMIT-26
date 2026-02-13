# Reserve a Seat – Backend (Node.js + MongoDB)

## Steps to run the backend

### 1. MongoDB

- Create a cluster at [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier is enough).
- Create a database user and note username/password.
- Get the connection string: **Connect → Drivers → Node.js** and copy the URI.
- (Optional) In **Network Access**, add your IP or allow `0.0.0.0/0` for development.

### 2. Environment variable

- Copy `.env.example` to `.env.local` in the project root.
- Set `MONGODB_URI` to your Atlas URI, e.g.:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/esummit?retryWrites=true&w=majority
```

Replace `USER`, `PASSWORD`, and the cluster host with your values.

### 3. Run the app

```bash
npm run dev
```

The app runs on the port in your `package.json` (e.g. 5005). The reserve APIs are served by the same Next.js server.

---

## API reference

Base URL: same as your app (e.g. `http://localhost:5005`).

### Reserve a seat

**POST** `/api/reservations`

Request body (JSON):

```json
{
  "eventId": 1,
  "email": "student@example.com",
  "name": "Student Name"
}
```

- `eventId`: number (1–7, same as in `/api/events`).
- `email`: string, required.
- `name`: string, required.

Responses:

- **200** – Success. Body includes `reservation` with `id`, `eventId`, `email`, `name`, `createdAt`.
- **400** – Missing or invalid `eventId`, `email`, or `name`.
- **409** – No seats left, or this email already has a reservation for this event.
- **500** – Server/DB error.

### List reservations

**GET** `/api/reservations`

Query params (optional):

- `eventId` – filter by event (e.g. `?eventId=1`).
- `email` – filter by user (e.g. `?email=user@example.com`).

Returns an array of reservations (same shape as above).

### Event seat availability

**GET** `/api/events/:id/availability`

Example: `GET /api/events/1/availability`

Response:

```json
{
  "eventId": 1,
  "totalSeats": 50,
  "reserved": 12,
  "available": 38
}
```

---

## Why data might not appear in MongoDB Compass

1. **Wrong collection** – This API saves to the **`reservations`** collection, not **`users`**. In Compass, open: **Esummit → reservations** (not `users`).
2. **Wrong cluster** – Your app uses the URI in `.env.local` (e.g. Atlas). In Compass you must connect to the **same** cluster (e.g. your Atlas connection string). If Compass is connected to **localhost** and the app uses **Atlas**, you will not see any data in localhost.
3. **Connection failing** – If the app cannot connect (wrong password, IP not allowlisted in Atlas), nothing is saved. Check the terminal for `Reservation error:` and the modal for the error message.

## Code layout

| Path | Purpose |
|------|--------|
| `lib/mongodb.ts` | MongoDB connection (cached for serverless). |
| `lib/models/Reservation.ts` | Mongoose model: `eventId`, `email`, `name`; unique per (eventId, email). |
| `app/api/reservations/route.ts` | POST = reserve, GET = list. |
| `app/api/events/[id]/availability/route.ts` | GET availability for one event. |

Capacity per event is defined in the API routes (e.g. 50–100 seats). You can change `EVENT_CAPACITY` in both `app/api/reservations/route.ts` and `app/api/events/[id]/availability/route.ts` to match your events.
