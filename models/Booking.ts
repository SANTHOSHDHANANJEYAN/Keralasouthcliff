import { Schema, model, models, Model, InferSchemaType } from "mongoose";

// Define the Booking schema
const BookingSchema = new Schema(
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
  { timestamps: true }
);

// Infer TypeScript type from schema
export type IBooking = InferSchemaType<typeof BookingSchema>;

// Export model safely (for Vercel hot reloads)
export const Booking: Model<IBooking> =
  (models.Booking as Model<IBooking>) || model<IBooking>("Booking", BookingSchema);
