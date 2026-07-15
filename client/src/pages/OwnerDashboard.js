import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./OwnerDashboard.css";
import { toast } from "react-toastify";



const OwnerDashboard = () => {
  const navigate = useNavigate();

  // Logged-in user
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Tabs
  const [activeTab, setActiveTab] = useState("add");

  // Properties
  const [properties, setProperties] = useState([]);

  // Bookings (frontend only for now)
  const [bookings, setBookings] = useState([]);

  // Edit Mode
  const [editingId, setEditingId] = useState(null);

  // Property Form
  const [formData, setFormData] = useState({
    propertyType: "",
    adType: "",
    address: "",
    contact: "",
    amount: "",
    description: "",
    image: "",
    status: "Available",
  });

  useEffect(() => {
    fetchProperties();
    fetchBookings();
  }, [fetchProperties, fetchBookings]);

  // Load Owner Bookings
  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "https://homehaven-house-rent-management-system.onrender.com/api/bookings/owner",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Load Properties
  const fetchProperties = async () => {
    try {
      const res = await axios.get(
        "https://homehaven-house-rent-management-system.onrender.com/api/properties/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setProperties(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Input Change
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Submit Property
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        await axios.put(
          `https://homehaven-house-rent-management-system.onrender.com/api/properties/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Property Updated Successfully");

      } else {

        const data = new FormData();

        data.append("propertyType", formData.propertyType);
        data.append("adType", formData.adType);
        data.append("address", formData.address);
        data.append("contact", formData.contact);
        data.append("amount", formData.amount);
        data.append("description", formData.description);
        data.append("status", formData.status);

        if (formData.image) {
          data.append("image", formData.image);
        }

        await axios.post(
          "https://homehaven-house-rent-management-system.onrender.com/api/properties",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Property Added Successfully");
      }

      setFormData({
        propertyType: "",
        adType: "",
        address: "",
        contact: "",
        amount: "",
        description: "",
        image: "",
        status: "Available",
      });

      setEditingId(null);

      fetchProperties();

      setActiveTab("properties");

    } catch (err) {
      console.log(err);
      console.log(err.response);

      alert(
        err.response?.data?.message ||
        err.message ||
        "Unable to save property"
      );
    }
  };

  // Edit Property
  const handleEdit = (property) => {

    setEditingId(property._id);

    setFormData({

      propertyType: property.propertyType,

      adType: property.adType,

      address: property.address,

      contact: property.contact,

      amount: property.amount,

      description: property.description,

      image: property.image,

      status: property.status,

    });

    setActiveTab("add");
  };

  // Delete Property
  const handleDelete = async (id) => {

    if (!window.confirm("Delete this property?")) return;

    try {

      await axios.delete(
        `https://homehaven-house-rent-management-system.onrender.com/api/properties/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchProperties();

    } catch (err) {
      console.log(err);
    }
  };

  const markBooked = async (bookingId) => {
    try {
      await axios.put(
        `https://homehaven-house-rent-management-system.onrender.com/api/bookings/${bookingId}/booked`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBookings();
      fetchProperties();

    } catch (err) {
      console.log(err);
    }
  };

  const markPending = async (bookingId) => {
    try {
      await axios.put(
        `https://homehaven-house-rent-management-system.onrender.com/api/bookings/${bookingId}/pending`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchBookings();
      fetchProperties();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="owner-dashboard">

      {/* Top Header */}

      <header className="topbar">

        <div className="logo">
          Home<span>Haven</span>
        </div>

        <div className="top-right">

          <span className="username">
            Hi {user?.name || "Owner"}
          </span>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Log Out
          </button>

        </div>

      </header>

      {/* Navigation Tabs */}

      <div className="tabs">

        <button
          className={activeTab === "add" ? "active" : ""}
          onClick={() => setActiveTab("add")}
        >
          Add Property
        </button>

        <button
          className={activeTab === "properties" ? "active" : ""}
          onClick={() => setActiveTab("properties")}
        >
          All Properties
        </button>

        <button
          className={activeTab === "bookings" ? "active" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          All Bookings
        </button>

      </div>

      {/* Main Card */}

      <div className="content-card">

        {activeTab === "add" && (

          <div className="add-property-card">

            <h1 className="form-title">
              Add New Property
            </h1>

            <form onSubmit={handleSubmit}>

              <div className="form-row">

                <div className="form-group">

                  <label>Property Type</label>

                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Land / Plot</option>
                  </select>

                </div>

                <div className="form-group">

                  <label>Property Ad Type</label>

                  <select
                    name="adType"
                    value={formData.adType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option>Rent</option>
                    <option>Sale</option>
                  </select>

                </div>

                <div className="form-group">

                  <label>Property Full Address</label>

                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              <div className="form-row">

                <div className="form-group">

                  <label>Property Images</label>

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                  />

                </div>

                <div className="form-group">

                  <label>Owner Contact No.</label>

                  <input
                    type="text"
                    name="contact"
                    placeholder="Contact Number"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>Property Amount</label>

                  <input
                    type="number"
                    name="amount"
                    placeholder="0"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              <div className="form-group full-width">

                <label>Additional Details for the Property</label>

                <textarea
                  rows="6"
                  name="description"
                  placeholder="Add any details here..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="submit-area">

                <button
                  type="submit"
                  className="submit-btn"
                >
                  {editingId ? "Update Property" : "Submit Form"}
                </button>

              </div>

            </form>

          </div>

        )}

        {activeTab === "properties" && (

          <div className="table-container">

            <table className="property-table">

              <thead>

                <tr>

                  <th>Property ID</th>

                  <th>Property Type</th>

                  <th>Ad Type</th>

                  <th>Address</th>

                  <th>Owner Contact</th>

                  <th>Amount</th>

                  <th>Availability</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {properties.length > 0 ? (

                  properties.map((property) => (

                    <tr key={property._id}>

                      <td>{property._id}</td>

                      <td>{property.propertyType}</td>

                      <td>{property.adType}</td>

                      <td>
                        <div className="address-cell">
                          {property.address}
                        </div>
                      </td>

                      <td>{property.contact}</td>

                      <td>₹ {property.amount}</td>

                      <td
                        className={
                          property.status === "Available"
                            ? "available"
                            : property.status === "Pending"
                              ? "pending"
                              : "unavailable"
                        }
                      >
                        {property.status}
                      </td>

                      <td>

                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(property)}
                        >
                          Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(property._id)}
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td colSpan="8" className="no-data">

                      No Properties Found

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        )}
        {activeTab === "bookings" && (

          <div className="table-container">

            <table className="property-table">

              <thead>

                <tr>

                  <th>Booking ID</th>

                  <th>Property ID</th>

                  <th>Tenant Name</th>

                  <th>Tenant Phone</th>

                  <th>Booking Status</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking._id}</td>

                      <td>{booking.property?.propertyType}</td>

                      <td>{booking.user?.name}</td>

                      <td>{booking.user?.email}</td>

                      <td>
                        <span
                          className={
                            booking.status === "Booked"
                              ? "available"
                              : "pending"
                          }
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className={
                            booking.status === "Pending"
                              ? "book-btn"
                              : "pending-btn"
                          }
                          onClick={() =>
                            booking.status === "Pending"
                              ? markBooked(booking._id)
                              : markPending(booking._id)
                          }
                        >
                          {booking.status === "Pending"
                            ? "Mark Booked"
                            : "Mark Pending"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No Bookings Available
                    </td>
                  </tr>
                )}
              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

};

export default OwnerDashboard;