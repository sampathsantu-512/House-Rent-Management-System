import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://homehaven-house-rent-management-system.onrender.com/api/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load bookings");
    }
  };

  const handleDelete = async (bookingId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://homehaven-house-rent-management-system.onrender.com/api/bookings/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking Cancelled Successfully");

      fetchBookings();
    } catch (error) {
      console.log(error);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-success mb-4">My Bookings</h2>

      {bookings.length === 0 ? (
        <h5>No bookings found.</h5>
      ) : (
        <div className="row">
          {bookings.map((booking) => (
            <div className="col-md-4 mb-4" key={booking._id}>
              <div className="card shadow-sm h-100">
                <img
                  src={booking.property.image}
                  className="card-img-top"
                  alt={booking.property.title}
                  style={{ height: "220px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5>{booking.property.title}</h5>

                  <p>
                    <strong>Location:</strong>{" "}
                    {booking.property.location}
                  </p>

                  <p>
                    <strong>Price:</strong> ₹{booking.property.price}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-success">
                      {booking.status}
                    </span>
                  </p>

                  <button
                    className="btn btn-danger w-100 mt-3"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;