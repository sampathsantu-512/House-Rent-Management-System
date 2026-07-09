import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://homehaven-house-rent-management-system.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed.";

      alert(message);
    }
  };

  return (
    <div className="container py-4 py-md-5">
      <div className="row justify-content-center align-items-center">

        <div className="col-12 col-sm-10 col-md-8 col-lg-5">

          <div className="card border-0 shadow rounded-4">

            <div className="card-body p-4 p-md-5">

              <div className="text-center mb-4">

                <h2 className="fw-bold text-success">
                  Create Account
                </h2>

                <p className="text-muted mb-0">
                  Join HomeHaven and find your perfect rental home.
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100"
                >
                  Create Account
                </button>

              </form>

              <hr className="my-4" />

              <p className="text-center mb-0">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-success fw-bold text-decoration-none"
                >
                  Login
                </Link>
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Register;