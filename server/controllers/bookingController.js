const Booking = require("../models/Booking");

// Create Booking
const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({
      user: req.user.id,
      property: req.body.property,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Logged-in User Bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    }).populate("property");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE BOOKING
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    await booking.deleteOne();

    res.json({
      message: "Booking cancelled successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  deleteBooking,
};