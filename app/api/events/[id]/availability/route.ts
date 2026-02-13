import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Reservation } from "@/lib/models/Reservation";

export const runtime = "nodejs";

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

/**
 * GET /api/events/:id/availability – Get seat availability for an event
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const eventId = Number(id);
    if (!Number.isInteger(eventId) || eventId < 1) {
      return NextResponse.json({ error: "Invalid event id" }, { status: 400 });
    }

    await connectDB();

    const totalSeats = EVENT_CAPACITY[eventId] ?? DEFAULT_CAPACITY;
    const reserved = await Reservation.countDocuments({ eventId });
    const available = Math.max(0, totalSeats - reserved);

    return NextResponse.json({
      eventId,
      totalSeats,
      reserved,
      available,
    });
  } catch (err) {
    console.error("Availability error:", err);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
