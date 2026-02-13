import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Reservation } from "@/lib/models/Reservation";

// Use Node.js runtime so mongoose works (Edge does not support it)
export const runtime = "nodejs";

// WHERE DATA IS SAVED: This API writes to the "reservations" collection in the
// database set by MONGODB_URI (e.g. Esummit). It does NOT write to "users".
// In MongoDB Compass: open the same cluster as in .env.local → Esummit → reservations.

// Max seats per event (match your event IDs from /api/events)
const EVENT_CAPACITY: Record<number, number> = {
  1: 50,
  2: 50,
  3: 100,
  4: 80,
  5: 60,
  6: 100,
  7: 80,
};

const DEFAULT_CAPACITY = 50;

function getCapacity(eventId: number): number {
  return EVENT_CAPACITY[eventId] ?? DEFAULT_CAPACITY;
}

/**
 * POST /api/reservations – Reserve a seat for an event
 * Body: { eventId: number, email: string, name: string }
 */
export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON body. Send { eventId, email, name }" },
        { status: 400 }
      );
    }
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Body must be a JSON object" },
        { status: 400 }
      );
    }
    const { eventId, email, name } = body as Record<string, unknown>;

    if (
      eventId === undefined ||
      eventId === null ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof name !== "string" ||
      !name.trim()
    ) {
      return NextResponse.json(
        { error: "eventId, email, and name are required" },
        { status: 400 }
      );
    }

    const id = Number(eventId);
    if (!Number.isInteger(id) || id < 1) {
      return NextResponse.json(
        { error: "eventId must be a positive integer" },
        { status: 400 }
      );
    }

    console.log("[reservations] POST received — eventId:", id, "email:", (email as string).trim());

    const conn = await connectDB();
    if (conn.connection.db?.databaseName) {
      console.log("[reservations] Connected to DB:", conn.connection.db.databaseName);
    }

    const capacity = getCapacity(id);
    const count = await Reservation.countDocuments({ eventId: id });
    if (count >= capacity) {
      return NextResponse.json(
        { error: "No seats left for this event" },
        { status: 409 }
      );
    }

    const doc = {
      eventId: id,
      email: email.trim().toLowerCase(),
      name: name.trim(),
    };
    const reservation = await Reservation.create(doc);
    // Ensure we're returning the saved document (with _id from MongoDB)
    if (!reservation._id) {
      console.error("[reservations] Created doc has no _id:", reservation);
      return NextResponse.json(
        { error: "Failed to save reservation" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reservation: {
        id: reservation._id.toString(),
        eventId: reservation.eventId,
        email: reservation.email,
        name: reservation.name,
        createdAt: reservation.createdAt,
      },
    });
  } catch (err: unknown) {
    const isMongoError =
      err && typeof err === "object" && "code" in err && err.code === 11000;
    if (isMongoError) {
      return NextResponse.json(
        { error: "You have already reserved a seat for this event" },
        { status: 409 }
      );
    }
    const message = err instanceof Error ? err.message : String(err);
    console.error("Reservation error:", message, err);
    return NextResponse.json(
      {
        error: "Failed to create reservation",
        ...(process.env.NODE_ENV === "development" && { detail: message }),
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/reservations – List reservations
 * Query: eventId (optional) – filter by event
 *        email (optional) – filter by user email
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const eventIdParam = searchParams.get("eventId");
    const emailParam = searchParams.get("email");

    const filter: { eventId?: number; email?: string } = {};
    if (eventIdParam !== null && eventIdParam !== "") {
      const id = Number(eventIdParam);
      if (Number.isInteger(id)) filter.eventId = id;
    }
    if (emailParam !== null && emailParam !== "") {
      filter.email = emailParam.trim().toLowerCase();
    }

    const reservations = await Reservation.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      reservations.map((r) => ({
        id: r._id.toString(),
        eventId: r.eventId,
        email: r.email,
        name: r.name,
        createdAt: r.createdAt,
      }))
    );
  } catch (err) {
    console.error("List reservations error:", err);
    return NextResponse.json(
      { error: "Failed to fetch reservations" },
      { status: 500 }
    );
  }
}
