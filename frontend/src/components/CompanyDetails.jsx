import React from 'react';
import "../App.css";
import { FaGlobe, FaInfoCircle, FaEnvelope, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";

function CompanyDetails({data}) {
    return (
        <div className="company-details-container">
          <h2>Company Details</h2>
    
          <div className="detail-section">
            <span className="detail-title">🌐 Website</span>
            <span className="detail-content">
              <a href="https://netflix.com" target="_blank" rel="noopener noreferrer">
                netflix.com
              </a>
            </span>
          </div>
    
          <div className="detail-section">
            <span className="detail-title">ℹ️ Description</span>
            <span className="detail-content">
              Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet, and more.
            </span>
          </div>
    
          <div className="detail-section">
            <span className="detail-title">📧 Email</span>
            <span className="detail-content">
              <a href="mailto:contact@netflix.com">contact@netflix.com</a>
            </span>
          </div>
    
          <div className="detail-section">
            <span className="detail-title">📘 Facebook</span>
            <span className="detail-content">
              <a href="https://www.facebook.com/netflix" target="_blank" rel="noopener noreferrer">
                https://www.facebook.com/netflix
              </a>
            </span>
          </div>
    
          <div className="detail-section">
            <span className="detail-title">📸 Instagram</span>
            <span className="detail-content">
              <a href="https://www.instagram.com/netflix" target="_blank" rel="noopener noreferrer">
                https://www.instagram.com/netflix
              </a>
            </span>
          </div>
    
          <div className="detail-section">
            <span className="detail-title">🐦 Twitter</span>
            <span className="detail-content">
              <a href="https://twitter.com/netflix" target="_blank" rel="noopener noreferrer">
                https://twitter.com/netflix
              </a>
            </span>
          </div>
    
          <div className="detail-section">
            <span className="detail-title">🔗 LinkedIn</span>
            <span className="detail-content">
              <a href="https://www.linkedin.com/company/netflix" target="_blank" rel="noopener noreferrer">
                https://www.linkedin.com/company/netflix
              </a>
            </span>
          </div>
    
          <div className="detail-section">
            <span className="detail-title">📍 Address</span>
            <span className="detail-content">San Francisco, United States</span>
          </div>
        </div>
      );
}

export default CompanyDetails;