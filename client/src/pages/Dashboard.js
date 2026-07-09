import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      const propertyResponse = await axios.get(
        "https://homehaven-house-rent-management-system.onrender.com/api/properties"
      );

      setProperties(propertyResponse.data);

      const bookingResponse = await axios.get(
        "https://homehaven-house-rent-management-system.onrender.com/api/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(bookingResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container py-4 py-md-5">

      {/* Header */}
      <div className="row align-items-center mb-4">

        <div className="col-12 col-md-8 text-center text-md-start">

          <h2 className="fw-bold text-success">
            Dashboard
          </h2>

          <p className="text-muted mb-3 mb-md-0">
            Welcome to your HomeHaven Dashboard
          </p>

        </div>

        <div className="col-12 col-md-4 text-center text-md-end">

          <Link
            to="/add-property"
            className="btn btn-success px-4"
          >
            + Add Property
          </Link>

        </div>

      </div>

      {/* Statistics */}

      <div className="row g-4 mb-5">

        <div className="col-12 col-sm-6 col-lg-4">

          <div className="card border-0 shadow rounded-4 h-100">

            <div className="card-body text-center">

              <h1 className="text-success fw-bold">
                {properties.length}
              </h1>

              <h5>Total Properties</h5>

            </div>

          </div>

        </div>

        <div className="col-12 col-sm-6 col-lg-4">

          <div className="card border-0 shadow rounded-4 h-100">

            <div className="card-body text-center">

              <h1 className="text-primary fw-bold">
                {bookings.length}
              </h1>

              <h5>My Bookings</h5>

            </div>

          </div>

        </div>

        <div className="col-12 col-sm-12 col-lg-4">

          <div className="card border-0 shadow rounded-4 h-100">

            <div className="card-body text-center">

              <h1 className="text-warning fw-bold">
                {properties.length}
              </h1>

              <h5>Available Properties</h5>

            </div>

          </div>

        </div>

      </div>

      {/* Property List */}

      <h3 className="fw-bold mb-4">
        All Properties
      </h3>

      <div className="row">

        {properties.length === 0 ? (

          <div className="text-center py-5">

            <h4>No Properties Found</h4>

          </div>

        ) : (

          properties.map((property) => (

            <div
              key={property._id}
              className="col-12 col-sm-6 col-lg-4 mb-4"
            >
              <PropertyCard property={property} />
            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default Dashboard;