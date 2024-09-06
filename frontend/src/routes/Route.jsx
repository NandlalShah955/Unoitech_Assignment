import React from "react";
import Homepage from "../pages/Homepage";
import Details from "../pages/Details";
import { Route, Routes } from "react-router-dom";

const AppRoute = () => {
  return (
    <>
      {/* System Routes Start*/}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/details" element={<Details />} />
      </Routes>
      {/* System Routes End*/}
    </>
  );
};

export default AppRoute;
