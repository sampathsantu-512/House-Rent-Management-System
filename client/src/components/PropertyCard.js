import React from "react";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const available = property.status === "Available";

  const image =
    property.images && property.images.length > 0
      ? property.images[0]
      : "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900";

  return (
    <div
      className="card border-0 mx-auto"
      onClick={() => navigate(`/property/${property._id}`)}
      style={{
        cursor: "pointer",
        background: "#1f2937",
        borderRadius: "12px",
        overflow: "hidden",
        color: "white",
        boxShadow: "0 4px 15px rgba(0,0,0,0.35)",
        height: "450px",
        maxWidth: "300px",
        // width:"100%",
        margin: "0 auto",// increase this
      }}
    >
      {/* Property Image */}

      <img
        src={
          image
        }
        alt="Property"
        style={{
          width: "100%",
          height: "420px",
          objectFit: "cover",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      />

      {/* Card Body */}

      <div className="p-2" style={{ padding: "10px" }}>

        {/* Address */}

        <h4
          style={{
            fontSize: "15px",
            fontWeight: "700",
            color: "white",
            lineHeight: "1.3",
            minHeight: "42px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {property.address}
        </h4>

        {/* Property Type & Ad Type */}

        <p
          style={{
            color: "#bdbdbd",
            marginTop: "-5px",
            marginBottom: "18px",
            fontSize: "18px",
          }}
        >
          {property.propertyType.toLowerCase()} - {property.adType.toLowerCase()}
        </p>
        {/* Owner */}

        <p
          style={{
            marginBottom: "6px",
            fontSize: "18px",
          }}
        >
          <strong>Owner:</strong> {property.contact}
        </p>

        {/* Availability */}

        <p
          style={{
            marginBottom: "6px",
            fontSize: "18px",
          }}
        >
          <strong>Availability:</strong>{" "}
          {available ? "Available" : "Unavailable"}
        </p>

        {/* Price */}

        <p
          style={{
            marginBottom: "8px",
            fontSize: "18px",
          }}
        >
          <strong>Price:</strong> ₹{property.amount}
        </p>

        {/* Show only if unavailable */}

        {!available && (
          <p
            style={{
              color: "#ef4444",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            Not Available
          </p>
        )}

        {/* Button */}

        <button
          className="btn w-100"
          disabled={!available}
          // onClick={() => navigate(`/property/${property._id}`)}
          style={{
            background: "#289545",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "7px",
            fontWeight: "600",
          }}
        >
          Get Info / Book
        </button>

      </div>
    </div>
  );
};

export default PropertyCard;