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

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
        `http://localhost:5000/api/properties/${propertyId}`,
        {
          title: formData.title,
          description: formData.description,
          location: formData.location,
          price: formData.price,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          image: formData.image,
          type: formData.type,
          status: formData.status,
        },
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
        `http://localhost:5000/api/properties/${propertyId}`,
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
      <div className="card h-100 shadow-sm border-0">
        <img
          src={property.image}
          className="card-img-top"
          alt={property.title}
          style={{ height: 220, objectFit: "cover" }}
        />

        <div className="card-body">
          <h5 className="text-success">{property.title}</h5>

          <p className="text-muted">{property.location}</p>

          <p className="fw-bold">
            ₹{property.price}/month
          </p>

          <p>
            <strong>Type:</strong>{" "}
            {property.type || "Apartment"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
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

          <p>{property.description}</p>
        </div>

        <div className="card-footer bg-white d-flex gap-2">
          <button
            className="btn btn-outline-success btn-sm"
            onClick={() => navigate(`/property/${property._id}`)}
          >
            View Details
          </button>

          <button
            className="btn btn-outline-warning btn-sm"
            onClick={handleEdit}
          >
            Edit
          </button>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,.5)" }}
          onClick={handleCloseModal}
        >
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">

              <div className="modal-header">
                <h5>Edit Property</h5>

                <button
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>

              <div className="modal-body">

                <input
                  className="form-control mb-3"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                />

                <input
                  className="form-control mb-3"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                />

                <input
                  className="form-control mb-3"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                />

                <input
                  className="form-control mb-3"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Image URL"
                />

                <input
                  className="form-control mb-3"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  placeholder="Bedrooms"
                />

                <input
                  className="form-control mb-3"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  placeholder="Bathrooms"
                />

                <select
                  className="form-select mb-3"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                >
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>House</option>
                  <option>PG</option>
                </select>

                <select
                  className="form-select mb-3"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option>Pending</option>
                  <option>Approved</option>
                </select>

                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />

              </div>

              <div className="modal-footer">

                <button
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
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