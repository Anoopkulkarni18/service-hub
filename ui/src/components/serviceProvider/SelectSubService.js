import React from "react";

function SelectSubService({ stepData, handleSubServiceChange }) {
  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Select a sub service
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {stepData.map((subService) => {
          return (
            <div
              key={subService.key}
              onClick={() => handleSubServiceChange(subService.key)}
              style={{
                margin: "10px",
                cursor: "pointer",
                width: "288px",
                borderRadius: "8px", // Add border radius
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow
              }}
            >
              <div
                className="card"
                style={{
                  height: "100%",
                  width: "100%",
                  border: "none", // Make border invisible
                }}
              >
                <img
                  src="..."
                  className="card-img-top"
                  alt="..."
                  style={{ width: "100%" }}
                />
                <div className="card-body">
                  <h5 className="card-title" style={{ fontWeight: "bold" }}>
                    {subService.name}
                  </h5>{" "}
                  {/* Make card name bold */}
                  <p className="card-text"></p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SelectSubService;
