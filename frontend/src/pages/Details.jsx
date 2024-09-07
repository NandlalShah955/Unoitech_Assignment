import React, { useState, useEffect } from 'react'
import {useLocation } from "react-router-dom";
import * as ScrappedService from "../services/DataScrapService/DataScrapService";
import { useDispatch } from "react-redux";
import InputComponent from "../components/InputComponent";
import CompanyInfo from '../components/CompanyInfo';
import CompanyDetails from '../components/CompanyDetails';
import ScreenshotSection from '../components/ScreenShot';
function Details() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [Scrappeddata, setScrappeddata] = useState([]);
  const [inputText, setInputText] = useState("");
  const { productId } = location.state || {};
  const [companyData, setCompanyData] = useState({
    name: "Netflix",
    description:
      "Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.",
    phone: "(573)-456-4644",
    email: "contact@netflix.com",
    facebookUrl: "https://www.facebook.com/netflix",
    instagramUrl: "https://www.instagram.com/netflix",
    twitterUrl: "https://twitter.com/netflix",
    linkedinUrl: "https://www.linkedin.com/company/netflix",
    address: "San Francisco, United States",
    website: "netflix.com",
  });
  useEffect(() => {
    dispatch(ScrappedService.getSingleScrappedData(productId))
      .then((response) => {
        setScrappeddata(response.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, [productId]);
  return (
    <div>
       <InputComponent inputText={inputText} setInputText={setInputText}  />
       <CompanyInfo
        name={companyData.name}
        description={companyData.description}
        phone={companyData.phone}
        email={companyData.email}
      />

      {/* Company Details */}
      <CompanyDetails />

      {/* Screenshot Section */}
      {/* <ScreenshotSection /> */}
    </div>
  )
}

export default Details