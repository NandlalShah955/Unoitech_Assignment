import React from 'react'
import "../App.css";
function CompanyInfo({ name, description, phone, email }) {
  return (

  <>
   <div className="netflix-card-container">
      <div className="netflix-logo-section">
        <img src="https://i.pinimg.com/736x/1b/54/ef/1b54efef3720f6ac39647fc420d4a6f9.jpg" alt="Netflix" className="netflix-logo" />
      </div>
      <div className="netflix-details-section">
        <h2 className="company-name">Netflix</h2>
        <div className="company-description">
          <span className="description-icon">ℹ️</span>
          <span className="description-text">
            Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet, and more.
          </span>
        </div>
      </div>
      <div className="contact-details-section">
        <div className="contact-info">
          <span className="contact-icon">📞</span>
          <span className="contact-text">Phone</span>
          <span className="contact-value">(573)-456-4644</span>
        </div>
        <div className="contact-info">
          <span className="contact-icon">✉️</span>
          <span className="contact-text">Email</span>
          <span className="contact-value">
            <a href="mailto:contact@netflix.com">contact@netflix.com</a>
          </span>
        </div>
      </div>
    </div>
  </>
  )
}

export default CompanyInfo;