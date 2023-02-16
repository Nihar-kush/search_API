import axios from "axios";
import express from "express";
import { createResponse } from "../response.js";

const router = express.Router();

//GET AIRPORTS API
router.get("/", async (req, res, next) => {
  const { location } = req.query;
  const url = `https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport?query=${location}`;
  const config = {
    headers: {
      "x-rapidapi-host": process.env.API_HOST,
      "x-rapidapi-key": process.env.API_KEY,
    },
  };
  //API_CALL
  try {
    const response = await axios.get(url, config);
    const { data } = response.data;
    const airports = data.map((airport) => ({
      name: airport.name,
      code: airport.code,
    }));
    res
      .status(200)
      .send(
        createResponse(
          true,
          null,
          airports,
          `${airports.length} Airports found`
        )
      );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
