import express from "express";

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.send("SEARCH API !!");
});

export default router;
