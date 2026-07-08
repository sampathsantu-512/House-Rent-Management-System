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
        const response = await axios.get("http://localhost:5000/api/properties");
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
    <div className="container py-5">

      <section className="text-center mb-5">
        <h1 className="display-5 fw-bold text-success">
          HouseRent
        </h1>

        <p className="lead text-muted">
          Find your dream rental home.
        </p>
      </section>

      <div className="row mb-4">

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search Location / Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Maximum Price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          />
        </div>

        <div className="col-md-4">
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

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="row">

        {filteredProperties.length === 0 ? (
          <h4 className="text-center mt-5">
            No Properties Found
          </h4>
        ) : (
          filteredProperties.map((property) => (
            <div
              className="col-lg-4 col-md-6 mb-4"
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