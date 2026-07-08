const express = require("express");

const {
  createBooking,
  getMyBookings,
  deleteBooking,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBooking);

router.get("/my", protect, getMyBookings);

router.delete("/:id", protect, deleteBooking);

module.exports = router;