import React from "react";
import "../App.css";
function CompanyInfo({ info }) {
  return (
    <>
      <div className="netflix-card-container">
        <div className="netflix-logo-section">
          <img src={info.logoUrl} alt="Netflix" className="netflix-logo" />
        </div>
        <div className="netflix-details-section">
          <h2 className="company-name">{info.name}</h2>
          <div className="company-description">
            <span className="description-icon">ℹ️</span>
            <span className="description-text">{info.description}</span>
          </div>
        </div>
        <div className="contact-details-section">
          <div className="contact-info">
            <span className="contact-icon">📞</span>
            <span className="contact-text">Phone</span>
            <span className="contact-value">{info.phoneNumber}</span>
          </div>
          <div className="contact-info">
            <span className="contact-icon">✉️</span>
            <span className="contact-text">Email</span>
            <span className="contact-value">
              <a href="mailto:contact@netflix.com">{info.email}</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyInfo;
