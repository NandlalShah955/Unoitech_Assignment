import React from "react";
import "../App.css";
import {
  FaGlobe,
  FaInfoCircle,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";

function CompanyDetails({ data }) {
  console.log("data", data);
  return (
    <div className="company-details-container">
      <h2>Company Details</h2>

      <div className="detail-section">
        <span className="detail-title">
          <FaGlobe /> Website
        </span>
        <span className="detail-content">
          <a href={data.url} target="_blank" rel="noopener noreferrer">
            {data.url}
          </a>
        </span>
      </div>

      <div className="detail-section">
        <span className="detail-title">
          <FaInfoCircle /> Description
        </span>
        <span className="detail-content">{data.description}</span>
      </div>

      <div className="detail-section">
        <span className="detail-title">
          <FaEnvelope /> Email
        </span>
        <span className="detail-content">
          <a href="mailto:contact@netflix.com">{data.email}</a>
        </span>
      </div>

      <div className="detail-section">
        <span className="detail-title">
          <FaFacebook /> Facebook
        </span>
        <span className="detail-content">
          <a href={data.facebookUrl} target="_blank" rel="noopener noreferrer">
            {data.facebookUrl}
          </a>
        </span>
      </div>

      <div className="detail-section">
        <span className="detail-title">
          <FaInstagram /> Instagram
        </span>
        <span className="detail-content">
          <a href={data.instagramUrl} target="_blank" rel="noopener noreferrer">
            {data.instagramUrl}
          </a>
        </span>
      </div>

      <div className="detail-section">
        <span className="detail-title">
          <FaTwitter /> Twitter
        </span>
        <span className="detail-content">
          <a href={data.twitterUrl} target="_blank" rel="noopener noreferrer">
            {data.twitterUrl}
          </a>
        </span>
      </div>

      <div className="detail-section">
        <span className="detail-title">
          <FaLinkedin /> LinkedIn
        </span>
        <span className="detail-content">
          <a href={data.linkedinUrl} target="_blank" rel="noopener noreferrer">
            {data.linkedinUrl}
          </a>
        </span>
      </div>

      <div className="detail-section">
        <span className="detail-title">
          <FaMapMarkerAlt /> Address
        </span>
        <span className="detail-content">{data.address}</span>
      </div>
    </div>
  );
}

export default CompanyDetails;
