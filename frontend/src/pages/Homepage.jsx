import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import * as ScrappedService from "../services/DataScrapService/DataScrapService";
import { useDispatch } from "react-redux";
import InputComponent from "../components/InputComponent";
import { Table, Pagination, Button, Typography } from "antd";
import exportFromJSON from "export-from-json";
import {
  LinkedinOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
} from "@ant-design/icons"; // Ant Design Icons

function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Title } = Typography;
  const [inputText, setInputText] = useState("");
  const [Scrappeddata, setScrappeddata] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [count, setcount] = useState(0);
  useEffect(() => {
    setisloading(true);
    dispatch(ScrappedService.getScrapedData())
      .then((response) => {
        setScrappeddata(response.data);
        setisloading(false);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  const columns = [
    {
      dataIndex: "select",
      key: "select",
      render: (_, record) => (
        <input
          type="checkbox"
          checked={selectedRowKeys.includes(record._id)}
          onChange={() => {
            const newSelectedRowKeys = selectedRowKeys.includes(record._id)
              ? selectedRowKeys.filter((key) => key !== record._id) // Uncheck
              : [...selectedRowKeys, record._id]; // Check
            setSelectedRowKeys(newSelectedRowKeys);
            setcount(newSelectedRowKeys.length);
          }}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    {
      title: "LOGO",
      dataIndex: "logoUrl",
      key: "logoUrl",
      render: (text) => <img src={text} alt="logo" height={25} width={25} />,
    },
    {
      title: "COMPANY",
      dataIndex: "name",
      key: "name",
      className:'uniqueColor'
      // ellipsis: true,
    },
    {
      title: "SOCIAL MEDIA",
      key: "socialMedia",
      className:"SocialMedia",
      render: (record) => (
        <div>
          {record.facebookUrl && (
            <a
              href={record.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlined
                style={{ fontSize: "25px", marginRight: "10px" }}
              />
            </a>
          )}
          {record.linkedinUrl && (
            <a
              href={record.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinOutlined
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
            </a>
          )}
          {record.twitterUrl && (
            <a
              href={record.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterOutlined
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
            </a>
          )}
          {record.instagramUrl && (
            <a
              href={record.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
            </a>
          )}
        </div>
      ),
    },
  
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
      // ellipsis: true,
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "PHONE NO.",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
       className:'uniqueColor'
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
       className:'uniqueColor'
    },

  ];
  const handleRowClick = (record) => {
    console.log(record, "record");
    navigate("/details", {
      state: { productId: record._id },
    });
  };
  // Function for exporting Data into CSV
  const exporttoCSV = () => {
    const data = Scrappeddata.map((item) => ({
      _id: item._id,
      name: item.name,
      description: item.description,
      logoUrl: item.logoUrl,
      facebookUrl: item.facebookUrl,
      linkedinUrl: item.linkedinUrl,
      twitterUrl: item.twitterUrl,
      instagramUrl: item.instagramUrl,
      address: item.address,
      phoneNumber: item.phoneNumber,
      email: item.email,
    }));
    if (data) {
      const fileName = "ScrappedDataCsv";
      const exportType = exportFromJSON.types.csv;
      exportFromJSON({ data, fileName, exportType });
    } else {
      Swal.fire({
        title: "Please Add Url to Export data to CSV",
        icon: "info",
      });
    }
  };
  // Function for handling Delete of particualar row using checkbox
  const handledeleteData = () => {
    dispatch(ScrappedService.deleteScrappedData(selectedRowKeys))
      .then((response) => {
        setScrappeddata(response.data);
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  return (
    <div className="app-container">
      {/* Search and Button */}
      <InputComponent
        inputText={inputText}
        setInputText={setInputText}
        setScrappeddata={setScrappeddata}
        setisloading={setisloading}
      />
      {/* Table */}
      <div className="button-group">
        <span className="selected-count">{count} Selected</span>
        <Button onClick={handledeleteData}>Delete</Button>
        <Button onClick={exporttoCSV}>Export to CSV</Button>
      </div>
      
      <Table
      className="MainDatatable"
        rowKey="_id"
        columns={columns}
        dataSource={Scrappeddata}
        pagination={false} // We handle pagination separately
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        scroll={{ x: "100%" }}
        loading={isloading}
      />

      {/* Pagination */}
      <div className="pagination-container">
        <Pagination defaultCurrent={1} total={1000} pageSize={10} />
      </div>
    </div>
  );
}

export default Homepage;
