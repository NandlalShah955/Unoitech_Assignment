import React, { useState, useEffect } from 'react'
import {useLocation } from "react-router-dom";
import * as ScrappedService from "../services/DataScrapService/DataScrapService";
import { useDispatch } from "react-redux";
import InputComponent from "../components/InputComponent";
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
  // console.log('Scrappeddata', Scrappeddata)
  return (
    <div>
       <InputComponent inputText={inputText} setInputText={setInputText}  />
    </div>
  )
}

export default Details