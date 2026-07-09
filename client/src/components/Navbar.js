import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top">
      <div className="container">

        <Link className="navbar-brand text-success fw-bold fs-3" to="/">
          HomeHaven
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link className="nav-link px-lg-3" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-lg-3" to="/dashboard">
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-lg-3" to="/add-property">
                Add Property
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-lg-3" to="/my-bookings">
                My Bookings
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-success px-lg-3" to="/login">
                Login
              </Link>
            </li>

            <li className="nav-item mt-2 mt-lg-0">
              <Link
                className="btn btn-success ms-lg-3 px-4 w-100 w-lg-auto text-white"
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