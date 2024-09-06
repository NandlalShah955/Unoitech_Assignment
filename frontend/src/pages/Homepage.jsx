import React, { useState, useEffect } from "react";
import "../App.css";
import * as ScrappedService from "../services/DataScrapService/DataScrapService";
import { useDispatch } from "react-redux";
import InputComponent from "../components/InputComponent";
import { Table, Pagination } from "antd";

function Homepage() {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [Scrappeddata, setScrappeddata] = useState([]);
  useEffect(() => {
    dispatch(ScrappedService.getScrapedData())
      .then((response) => {
        setScrappeddata(response.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Logo",
      dataIndex: "logoUrl",
      key: "logoUrl",
      render: (text) => <img src={text} alt="logo" width={100} />,
    },
    {
      title: "FaceBook Url",
      dataIndex: "facebookUrl",
      key: "facebookUrl",
    },
    {
      title: "Linkedin Url",
      dataIndex: "linkedinUrl",
      key: "linkedinUrl",
    },
    {
      title: "Twitter Url",
      dataIndex: "twitterUrl",
      key: "twitterUrl",
    },
    {
      title: "Instagram Url",
      dataIndex: "instagramUrl",
      key: "instagramUrl",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];
  return (
    <div className="app-container">
      {/* Search and Button */}
      <InputComponent inputText={inputText} setInputText={setInputText} />
      {/* Table */}
      <Table
       rowKey="_id"
        columns={columns}
        dataSource={Scrappeddata}
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
