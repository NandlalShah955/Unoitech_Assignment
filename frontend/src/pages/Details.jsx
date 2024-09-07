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
       info={Scrappeddata}
       
      />

      {/* Company Details */}
      <CompanyDetails data={Scrappeddata}/>

      {/* Screenshot Section */}
      {/* <ScreenshotSection /> */}
    </div>
  )
}

export default Details