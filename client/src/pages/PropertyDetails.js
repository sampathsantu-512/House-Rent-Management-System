import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(
          `https://homehaven-house-rent-management-system.onrender.com/api/properties/${id}`
        );

        setProperty(response.data);
        setError("");
      } catch (err) {
        setError("Property not found");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        return;
      }

      await axios.post(
        "https://homehaven-house-rent-management-system.onrender.com/api/bookings",
        {
          property: property._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Property booked successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed.");
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border text-success mb-3"
          role="status"
        ></div>
        <h5>Loading Property...</h5>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">
          Property not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 py-md-5">
      <div className="row g-4">

        {/* Left Section */}
        <div className="col-12 col-lg-8">

          <div className="card border-0 shadow rounded-4 overflow-hidden">

            <img
              src={property.image}
              alt={property.title}
              className="img-fluid"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
              }}
            />

            <div className="card-body p-4">

              <h2 className="fw-bold text-success mb-3">
                {property.title}
              </h2>

              <h3 className="fw-bold mb-3">
                ₹ {property.price}
                <small className="text-muted fs-6">
                  {" "}
                  / month
                </small>
              </h3>

              <p className="mb-2">
                <strong>Location:</strong> {property.location}
              </p>

              <p className="mb-3">
                <strong>Bedrooms:</strong> {property.bedrooms}
              </p>

              <p className="mb-3">
                <strong>Bathrooms:</strong> {property.bathrooms}
              </p>

              <hr />

              <h5>Description</h5>

              <p className="text-muted">
                {property.description}
              </p>

            </div>

          </div>

        </div>

        {/* Right Section */}
        <div className="col-12 col-lg-4">

          <div
            className="card border-0 shadow rounded-4"
            style={{
              position: "sticky",
              top: "90px",
            }}
          >

            <div className="card-body p-4">

              <h4 className="text-success mb-4">
                Booking
              </h4>

              <button
                className="btn btn-success w-100 mb-3 py-2"
                onClick={handleBooking}
              >
                Book Property
              </button>

              <Link
                to="/"
                className="btn btn-outline-secondary w-100 py-2"
              >
                Back to Home
              </Link>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;