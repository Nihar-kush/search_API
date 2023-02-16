import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import baseRoute from "./routes/base.js";
import cors from "cors";
import airportRoute from "./routes/airport.js";
import hotelRoute from "./routes/hotel.js";


// CONFIGURATIONS
const app = express();
dotenv.config();

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/", baseRoute);
app.use("/api/airports", airportRoute);
app.use("/api/hotels", hotelRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

//MONGODB CONNECTION
const PORT = process.env.PORT || 4000;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
