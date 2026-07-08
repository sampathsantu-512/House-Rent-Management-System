import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/properties/${id}`
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

  // ==========================
  // BOOK PROPERTY FUNCTION
  // ==========================
  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first.");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/bookings",
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
        <h4>Loading...</h4>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Property not found.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">

        <div className="col-lg-8">
          <div className="card shadow">

            <img
              src={property.image}
              alt={property.title}
              className="card-img-top"
              style={{
                height: "400px",
                objectFit: "cover",
              }}
            />

            <div className="card-body">

              <h2 className="text-success">
                {property.title}
              </h2>

              <h5 className="mt-3">
                ₹ {property.price}
              </h5>

              <p>
                <strong>Location :</strong>{" "}
                {property.location}
              </p>

              <p>
                <strong>Description :</strong>{" "}
                {property.description}
              </p>

            </div>

          </div>
        </div>

        <div className="col-lg-4">

          <div className="card shadow">

            <div className="card-body">

              <h4 className="text-success mb-4">
                Property Details
              </h4>

              <p>
                <strong>Bedrooms :</strong>{" "}
                {property.bedrooms}
              </p>

              <p>
                <strong>Bathrooms :</strong>{" "}
                {property.bathrooms}
              </p>

              <button
                className="btn btn-success w-100 mb-3"
                onClick={handleBooking}
              >
                Book Property
              </button>

              <a
                href="/"
                className="btn btn-secondary w-100"
              >
                Back to Home
              </a>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;