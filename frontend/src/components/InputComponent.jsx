import React from 'react'
import '../App.css';
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
function InputComponent({ inputText, setInputText }) {
  return (
    <div className="search-container">
    <Input
      placeholder="Enter domain name"
      suffix={<SearchOutlined />}
      className="search-input"
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
    />
    <Button type="primary" className="fetch-btn">
      Fetch & Save Details
    </Button>
  </div>
  )
}

export default InputComponent;