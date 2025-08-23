import { Schema, model, models, Model } from "mongoose";

// Define the Booking interface
export interface IBooking {
  name: string;
  email: string;
  phone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  roomType: string;
  specialRequests?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Booking schema
const BookingSchema = new Schema<IBooking>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true },
    roomType: { type: String, required: true },
    specialRequests: { type: String },
  },
  {
    timestamps: true,
  }
);

// Export the model with type assertion to prevent TS build errors
export const Booking =
  (models.Booking as Model<IBooking>) ||
  model<IBooking>("Booking", BookingSchema);
