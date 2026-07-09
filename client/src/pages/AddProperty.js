import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [type, setType] = useState("Apartment");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to add a property.");
        navigate("/login");
        return;
      }

      await axios.post(
        "https://homehaven-house-rent-management-system.onrender.com/api/properties",
        {
          title,
          description,
          location,
          price,
          bedrooms,
          bathrooms,
          image: imageUrl,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Property Added Successfully");
      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to add property."
      );
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="fw-bold text-success mb-2">Add New Property</h3>
              <p className="text-muted mb-4">
                Fill in the details below to list your property.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label fw-semibold">Property Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Property Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label fw-semibold">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label fw-semibold">Monthly Rent</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label fw-semibold">Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Paste Image URL"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label fw-semibold">Bedrooms</label>
                    <input
                      type="number"
                      className="form-control"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                    />
                  </div>

                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label fw-semibold">Bathrooms</label>
                    <input
                      type="number"
                      className="form-control"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label fw-semibold">Property Type</label>
                    <select
                      className="form-select"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option>Apartment</option>
                      <option>Villa</option>
                      <option>House</option>
                      <option>PG</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    rows="5"
                    className="form-control"
                    placeholder="Write about your property..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Save Property
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;