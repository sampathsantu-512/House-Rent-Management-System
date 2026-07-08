import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch Properties
      const propertyResponse = await axios.get(
        "http://localhost:5000/api/properties"
      );
      setProperties(propertyResponse.data);

      // Fetch Bookings
      const bookingResponse = await axios.get(
        "http://localhost:5000/api/bookings/my",
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
    <div className="container py-5">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-success">Dashboard</h2>
          <p className="text-muted">
            Welcome to your House Rent Dashboard
          </p>
        </div>

        <a href="/add-property" className="btn btn-success">
          Add Property
        </a>
      </div>

      {/* Statistics */}
      <div className="row mb-5">

        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h3>{properties.length}</h3>
              <p>Total Properties</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h3>{bookings.length}</h3>
              <p>My Bookings</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h3>
                {properties.length}
              </h3>
              <p>Available Properties</p>
            </div>
          </div>
        </div>

      </div>

      <h3 className="mb-4">All Properties</h3>

      <div className="row">

        {properties.map((property) => (
          <div
            key={property._id}
            className="col-md-6 col-lg-4 mb-4"
          >
            <PropertyCard property={property} />
          </div>
        ))}

      </div>

    </div>
  );
};

export default Dashboard;