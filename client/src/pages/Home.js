import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [bedroomFilter, setBedroomFilter] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "https://homehaven-house-rent-management-system.onrender.com/api/properties"
        );
        setProperties(response.data);
      } catch (err) {
        setError("Unable to load properties.");
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      priceFilter === "" || Number(property.price) <= Number(priceFilter);

    const matchesBedrooms =
      bedroomFilter === "" ||
      Number(property.bedrooms) === Number(bedroomFilter);

    return matchesSearch && matchesPrice && matchesBedrooms;
  });

  return (
    <div className="container py-4 py-md-5">

      {/* Hero Section */}
      <section className="text-center mb-5">
        <h1 className="display-4 fw-bold text-success">
          HomeHaven
        </h1>

        <p className="lead text-muted px-3">
          Find your dream rental home with comfort and ease.
        </p>
      </section>

      {/* Search & Filters */}
      <div className="row g-3 mb-4">

        <div className="col-12 col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Title or Location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Maximum Price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-4">
          <select
            className="form-select"
            value={bedroomFilter}
            onChange={(e) => setBedroomFilter(e.target.value)}
          >
            <option value="">Bedrooms</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4+ BHK</option>
          </select>
        </div>

      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger text-center">
          {error}
        </div>
      )}

      {/* Property Cards */}
      <div className="row">

        {filteredProperties.length === 0 ? (
          <div className="text-center mt-5">
            <h4>No Properties Found</h4>
          </div>
        ) : (
          filteredProperties.map((property) => (
            <div
              className="col-12 col-sm-6 col-lg-4 mb-4"
              key={property._id}
            >
              <PropertyCard property={property} />
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default Home;