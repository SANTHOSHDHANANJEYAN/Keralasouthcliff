// /models/Booking.ts
import { Schema, model, models, Model } from "mongoose";

export type VillaType = "Top Floor" | "Ground Floor" | "Entire Villa";

export interface IBooking {
  name: string;
  email: string;
  phone: string;
  guests: number;
  villa: VillaType;
  checkIn: string;   // stored as YYYY-MM-DD (local date)
  checkOut: string;  // stored as YYYY-MM-DD (local date)
  message?: string;
  createdAt: Date;
  status: "confirmed"; // keep simple for now
}

const BookingSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    guests: { type: Number, required: true, min: 1, max: 8 },
    villa: {
      type: String,
      required: true,
      enum: ["Top Floor", "Ground Floor", "Entire Villa"],
    },
    checkIn: { type: String, required: true },  // YYYY-MM-DD
    checkOut: { type: String, required: true }, // YYYY-MM-DD
    message: { type: String, default: "" },
    status: { type: String, default: "confirmed" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Compound index for fast overlap checks
BookingSchema.index({ villa: 1, checkIn: 1, checkOut: 1 });

// Export model with type safety
export const Booking: Model<IBooking> =
  models.Booking || model<IBooking>("Booking", BookingSchema);
