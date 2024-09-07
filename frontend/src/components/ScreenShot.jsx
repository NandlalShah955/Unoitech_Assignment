import React from "react";
import "../App.css";
function ScreenShotSection({data}) {
  return (
    <div className="screenshot-section">
      <img
        src={data.logoUrl}
        alt="Screenshot of webpage"
      />
    </div>
  );
}

export default ScreenShotSection;
