import React from "react";

function SubService({ stepData, handleSubServiceChange }) {
  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Select a sub service
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {stepData.map((subService, index) => (
          <div
            key={subService.key}
            onClick={() => handleSubServiceChange(subService.key)}
            style={{
              margin: "10px",
              padding: "10px",
              cursor: "pointer",
              width: "300px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // add shadow
              borderRadius: "10px", // add border radius
              overflow: "hidden", // hide overflow
            }}
          >
            <div
              className="card"
              style={{ height: "100%", width: "100%", border: "none" }}
            >
              <img
                src="..."
                className="card-img-top"
                alt="..."
                style={{ width: "100%" }}
              />
              <div className="card-body">
                <h5 className="card-title">{subService.name}</h5>
                <p className="card-text"></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubService;
