# Registration / Reserve-a-Seat — Verification Checklist

Use this to verify that the form sends data, the API runs, and data appears in MongoDB.

---

## 1. Is the form sending data?

**Status: Yes — form is wired to the API.**

- **File:** `components/RegistrationModal.tsx`
- **What it does:** On submit, it sends a `POST` to `/api/reservations` with:
  - `eventId` (from "Select Event" dropdown)
  - `email` (from Email field)
  - `name` (from Full Name field)
- **How to verify:**
  - Open DevTools (F12) → **Network** tab.
  - Submit the form (fill Name, Email, choose an Event, click "Complete Registration").
  - Look for a request to **`reservations`** (or `api/reservations`). Click it.
  - **Request payload** should show `{"eventId":1,"email":"...","name":"..."}`.
  - If you see this request, the form **is** sending data.

---

## 2. Do you have the API route?

**Status: Yes — route exists.**

- **Path:** `app/api/reservations/route.ts`
- **Endpoints:**
  - **POST /api/reservations** — create a reservation (used by the form).
  - **GET /api/reservations** — list reservations (optional, for admin/testing).
- **How to verify:** The file exists at `app/api/reservations/route.ts`. No need to create it.

---

## 3. Is the Register/Reserve API correct?

**Status: Yes — API is implemented.**

- **POST** validates `eventId`, `email`, `name` → connects to MongoDB → saves to **reservations** collection.
- **GET** reads from the same collection (with optional `?eventId=` or `?email=`).
- **Model:** `lib/models/Reservation.ts` (Mongoose schema: eventId, email, name; unique per event+email).

---

## 4. Is the form connected to the API?

**Status: Yes — connected.**

- **Form submit handler** in `RegistrationModal.tsx` (around lines 50–59):
  - `fetch("/api/reservations", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ eventId, email, name }) })`
- **Success:** Shows "Registration complete!" then closes the modal.
- **Error:** Shows the API error message in red in the modal.

---

## 5. Check .env connection

**Status: Configured.**

- **File:** `.env.local` in the project root (not committed; in `.gitignore`).
- **Required variable:** `MONGODB_URI`
  - Must point to your **Atlas** cluster (e.g. `cluster0.zpokbfi.mongodb.net`) and database **Esummit**.
  - Example format:  
    `MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster0.zpokbfi.mongodb.net/Esummit?retryWrites=true&w=majority`
- **How to verify:**
  - Ensure `.env.local` exists and contains `MONGODB_URI=...` with your real password.
  - Restart the dev server after changing `.env.local` (`npm run dev`).

---

## 6. Check server terminal

**What to look for when you submit the form:**

1. **Request received**  
   You should see a log like:  
   `[reservations] POST received — eventId: 1 email: user@example.com`

2. **Database connected**  
   Then:  
   `[reservations] Connected to DB: Esummit`

3. **Errors**  
   If something fails you may see:  
   `Reservation error: <message>`  
   Use that message to fix connection or validation issues.

**If you see no log at all:** The request is not reaching the API (check Network tab: is the request sent? Does it go to the correct URL and port?)

---

## 7. Verify in MongoDB

**Where data is stored:**

- **Database:** Same as in your URI — e.g. **Esummit**.
- **Collection:** **reservations** (not `users`).

**In MongoDB Compass:**

1. Connect using the **same** cluster as in `MONGODB_URI` (e.g. your Atlas connection string).
2. Open the **Esummit** database.
3. Open the **reservations** collection.
4. After a successful registration, click **Refresh** — you should see documents with:
   - `eventId` (number)
   - `email` (string)
   - `name` (string)
   - `createdAt` (date)

**If you only see a `users` collection:** The app does not write to `users` for this flow. All reservation data is in **reservations**.

---

## Quick test (curl)

With the dev server running (`npm run dev`):

```bash
curl -X POST http://localhost:5005/api/reservations -H "Content-Type: application/json" -d "{\"eventId\":1,\"email\":\"test@example.com\",\"name\":\"Test User\"}"
```

- **200 + JSON** with `"success": true` and a `reservation` object → API and DB are working.
- **500 or error JSON** → Check server terminal for `Reservation error:` and fix (often connection or env).

---

## Summary

| Check                         | Status   | Where to look |
|------------------------------|----------|----------------|
| Form sending data            | Yes      | Network tab → `reservations` request |
| API route exists             | Yes      | `app/api/reservations/route.ts` |
| Register API implemented     | Yes      | POST saves to MongoDB |
| Form connected to API        | Yes      | `RegistrationModal.tsx` → fetch `/api/reservations` |
| .env connection              | Set      | `.env.local` → `MONGODB_URI` |
| Server terminal              | Use it   | Look for `[reservations] POST received` and `Connected to DB` |
| Verify in MongoDB             | Use it   | Compass → Esummit → **reservations** |
