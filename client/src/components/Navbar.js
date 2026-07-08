import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div className="container">
        <Link className="navbar-brand text-success fw-bold" to="/">
          HouseRent
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/dashboard">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-dark" to="/add-property">
                Add Property
              </Link>
            </li>

            {/* NEW */}
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/my-bookings">
                My Bookings
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-success" to="/login">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link btn btn-success text-white ms-lg-3 px-4"
                to="/register"
              >
                Register
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;