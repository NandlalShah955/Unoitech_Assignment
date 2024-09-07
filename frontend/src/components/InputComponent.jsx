import "../App.css";
import React from "react";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import * as ScrappedService from "../services/DataScrapService/DataScrapService";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
function InputComponent({
  inputText,
  setInputText,
  setScrappeddata,
  setisloading,
}) {
  const dispatch = useDispatch();
  const handleSearch = () => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    // Validating the URL
    if (!urlPattern.test(inputText)) {
      Swal.fire({
        icon: "info",
        title: "Please Enter a valid Url",
      });
      return;
    }
    setisloading(true);
    dispatch(ScrappedService.ScrapDatafromURL({ url: inputText }))
      .then((response) => {
        const message = response.data.message;
        setScrappeddata(response.data.data);
        Swal.fire({
          title: message,
          icon: "success",
        });
        setisloading(false);
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
      <Button className="fetch-btn" onClick={handleSearch}>
        Fetch & Save Details
      </Button>
    </div>
  );
}

export default InputComponent;
