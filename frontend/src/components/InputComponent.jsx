import "../App.css";
import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import * as ScrappedService from "../services/DataScrapService/DataScrapService";
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2'
function InputComponent({ inputText, setInputText }) {
  const dispatch=useDispatch();
  const handleSearch = () => {
    const urlPattern = new RegExp('^(https?:\\/\\/)?'+
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' + 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
      '(\\?[;&a-z\\d%_.~+=-]*)?' + 
      '(\\#[-a-z\\d_]*)?$', 'i'); 

  // Validating the URL
  if (!urlPattern.test(inputText)) {
      Swal.fire({
        icon: "info",
        title:'Please Enter a valid Url',
    });
      return;
  }
    dispatch(ScrappedService.ScrapDatafromURL({url:inputText}))
      .then((response) => {
      console.log(response.data);
      const message=response.data.message;
      Swal.fire({
        title: message,
        icon: "success",
    });
    window.location.reload();
      })
      .catch((err) => {
        let message = err.response.data.message;
        Swal.fire({
          title: message,
          icon: "warning",
          showCancelButton: true,
      });
        console.log({ err });
      });
  };
  return (
    <div className="search-container">
      <Input
        placeholder="Enter domain name"
        suffix={<SearchOutlined />}
        className="search-input"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button type="primary" className="fetch-btn" onClick={handleSearch}>
        Fetch & Save Details
      </Button>
    </div>
  );
}

export default InputComponent;
