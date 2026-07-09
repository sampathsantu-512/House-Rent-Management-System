import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: property.title || "",
    description: property.description || "",
    location: property.location || "",
    price: property.price || "",
    bedrooms: property.bedrooms || "",
    bathrooms: property.bathrooms || "",
    image: property.image || "",
    type: property.type || "Apartment",
    status: property.status || "Pending",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in.");
        return;
      }

      const propertyId = property.id || property._id;

      await axios.put(
        `https://homehaven-house-rent-management-system.onrender.com/api/properties/${propertyId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Property Updated Successfully");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this property?")) return;

    try {
      const token = localStorage.getItem("token");

      const propertyId = property.id || property._id;

      await axios.delete(
        `https://homehaven-house-rent-management-system.onrender.com/api/properties/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Property Deleted");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <>
      <div className="card border-0 shadow rounded-4 h-100">

        <img
          src={property.image}
          alt={property.title}
          className="card-img-top"
          style={{
            height: "230px",
            objectFit: "cover",
          }}
        />

        <div className="card-body d-flex flex-column">

          <h5 className="fw-bold text-success">
            {property.title}
          </h5>

          <p className="text-muted mb-2">
            {property.location}
          </p>

          <h5 className="fw-bold">
            ₹{property.price}/month
          </h5>

          <p className="mb-2">
            {property.type || "Apartment"}
          </p>

          <p>
            <span
              className={`badge ${
                property.status === "Approved"
                  ? "bg-success"
                  : "bg-warning text-dark"
              }`}
            >
              {property.status || "Pending"}
            </span>
          </p>

          <p className="text-muted flex-grow-1">
            {property.description}
          </p>

        </div>

        <div className="card-footer bg-white border-0">

          <div className="d-grid gap-2">

            <button
              className="btn btn-success"
              onClick={() => navigate(`/property/${property._id}`)}
            >
              View Details
            </button>

            <div className="row g-2">

              <div className="col-6">

                <button
                  className="btn btn-outline-warning w-100"
                  onClick={() => setShowModal(true)}
                >
                  Edit
                </button>

              </div>

              <div className="col-6">

                <button
                  className="btn btn-outline-danger w-100"
                  onClick={handleDelete}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {showModal && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content rounded-4">

              <div className="modal-header">

                <h4 className="text-success">
                  Edit Property
                </h4>

                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>

              </div>

              <div className="modal-body">

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <input
                      className="form-control form-control-lg"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Title"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      className="form-control form-control-lg"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Location"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      className="form-control form-control-lg"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Price"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      className="form-control form-control-lg"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      placeholder="Image URL"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      className="form-control form-control-lg"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      placeholder="Bedrooms"
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      className="form-control form-control-lg"
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      placeholder="Bathrooms"
                    />
                  </div>

                  <div className="col-md-6 mb-3">

                    <select
                      className="form-select form-select-lg"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      <option>Apartment</option>
                      <option>Villa</option>
                      <option>House</option>
                      <option>PG</option>
                    </select>

                  </div>

                  <div className="col-md-6 mb-3">

                    <select
                      className="form-select form-select-lg"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                    >
                      <option>Pending</option>
                      <option>Approved</option>
                    </select>

                  </div>

                  <div className="col-12">

                    <textarea
                      rows="5"
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />

                  </div>

                </div>

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-success"
                  onClick={handleSave}
                >
                  Save Changes
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyCard;