import { Schema, model, models, Model } from "mongoose";

// Define the Booking interface
export interface IBooking {
  name: string;
  email: string;
  phone: string;
  guests: number;
  villa: string;
  checkIn: Date;
  checkOut: Date;
  message?: string;
  status?: "confirmed" | "pending" | "cancelled";
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Booking schema
const BookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    guests: { type: Number, required: true },
    villa: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: ["confirmed", "pending", "cancelled"],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  }
);

// Export the model (safe for Vercel & Next.js)
export const Booking =
  (models.Booking as Model<IBooking>) ||
  model<IBooking>("Booking", BookingSchema);
