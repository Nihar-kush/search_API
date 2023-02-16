import axios from "axios";
import express from "express";
import Hotel from "../models/Hotel.js";
import { createResponse } from "../response.js";

const router = express.Router();

//ADD HOTELS API
router.post("/add", async (req, res, next) => {
  const { name, location, phone, pictures } = req.body;
  const picturesCount = pictures.length;
  if (picturesCount < 2) {
    res
      .status(200)
      .send(
        createResponse(
          true,
          "Error adding hotel",
          null,
          "PLease provide atleast 2 pictures of the hotel!"
        )
      );
  } else {
    const hotel = new Hotel({ name, location, phone, pictures });
    try {
      const newHotel = await hotel.save();
      res.send(newHotel);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating hotel");
    }
  }
});

//GET HOTELS API
router.get("/get", async (req, res, next) => {
  const { location } = req.query;
  const searchUrl = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation?query=${location}}`;

  const urlFilter =
    "https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels";

  const config = {
    headers: {
      "x-rapidapi-host": process.env.API_HOST,
      "x-rapidapi-key": process.env.API_KEY,
    },
  };

  //API_CALL
  try {
    const response = await axios.get(searchUrl, config);
    const { data } = response.data;
    const config1 = {
      headers: {
        "x-rapidapi-host": process.env.API_HOST,
        "x-rapidapi-key": process.env.API_KEY,
      },
      params: {
        geoId: data[0].geoId,
        checkIn: "2023-02-16",
        checkOut: "2023-02-18",
        pageNumber: "1",
        rating: "4",
        sort: "DISTANCE_FROM_CITY_CENTER",
      },
    };
    const filteredResponse = await axios.get(urlFilter, config1);
    const filteredHotels = filteredResponse.data.data.data;
    res
      .status(200)
      .send(createResponse(true, null, filteredHotels, `Location found`));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
