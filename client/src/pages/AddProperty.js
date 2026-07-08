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
        "http://localhost:5000/api/properties",
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
        <div className="col-lg-8">

          <div className="card shadow">

            <div className="card-body">

              <h2 className="text-success mb-4">
                Add Property
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="row">

                  <div className="col-md-6 mb-3">
                    <label>Property Title</label>
                    <input
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Location</label>
                    <input
                      className="form-control"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Price</label>
                    <input
                      type="number"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Image URL</label>
                    <input
                      className="form-control"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Bedrooms</label>
                    <input
                      type="number"
                      className="form-control"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Bathrooms</label>
                    <input
                      type="number"
                      className="form-control"
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label>Property Type</label>

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

                <div className="mb-3">
                  <label>Description</label>

                  <textarea
                    rows="4"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <button className="btn btn-success">
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