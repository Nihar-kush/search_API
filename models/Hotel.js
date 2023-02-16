import mongoose from "mongoose";
const { Schema } = mongoose;

const HotelSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String, required: true },
    pictures: { type: [String], required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", HotelSchema);
