import mongoose, { Schema, model, models } from "mongoose";

export interface IReservation {
  _id: mongoose.Types.ObjectId;
  eventId: number;
  email: string;
  name: string;
  createdAt: Date;
}

const reservationSchema = new Schema<IReservation>(
  {
    eventId: { type: Number, required: true, index: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// One reservation per email per event
reservationSchema.index({ eventId: 1, email: 1 }, { unique: true });

export const Reservation =
  models.Reservation ?? model<IReservation>("Reservation", reservationSchema);
