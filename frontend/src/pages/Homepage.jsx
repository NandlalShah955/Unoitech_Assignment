import React,{useState} from "react";
import "../App.css";
import InputComponent from "../components/InputComponent";
import { Table, Pagination } from "antd";

function Homepage() {
  const [inputText, setInputText] = useState("");
  const companyData = [
    // Example data structure. You can fetch real data from your backend or scraping function.
    {
      key: "1",
      company: {
        name: "Airbnb",
        logo: "https://logo-url", // Replace with actual image URL
      },
      socialProfiles: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
      },
      description:
        "Modernize workflows with Zoom’s trusted collaboration tools...",
      address: "San Francisco, United States",
      phone: "573-467-7494",
      email: "contact@airbnb.com",
    },
    // Add more company entries here...
  ];

  const columns = [
    {
      title: "Company",
      dataIndex: "company",
      render: (company) => (
        <div className="company">
          <img src={company.logo} alt={company.name} className="company-logo" />
          {company.name}
        </div>
      ),
    },
    {
      title: "Social Profiles",
      dataIndex: "socialProfiles",
      render: (socialProfiles) => (
        <div className="social-icons">
          <a href={socialProfiles.facebook}>
            <i className="fab fa-facebook"></i>
          </a>
          <a href={socialProfiles.twitter}>
            <i className="fab fa-twitter"></i>
          </a>
          <a href={socialProfiles.linkedin}>
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone No.",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
    },
  ];
  return (
    <div className="app-container">
      {/* Search and Button */}
      <InputComponent inputText={inputText} setInputText={setInputText}/>
      {/* Table */}
      <Table
        columns={columns}
        dataSource={companyData}
        pagination={false} // We handle pagination separately
      />

      {/* Pagination */}
      <div className="pagination-container">
        <Pagination defaultCurrent={1} total={1000} pageSize={10} />
      </div>
    </div>
  );
}

export default Homepage;
