import React from "react";

function Services({ stepData, handleServiceChange }) {
  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>Select a sub category</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {stepData.map((ser) => {
          return (
            <div
              key={ser.key}
              onClick={() => handleServiceChange(ser.key)}
              style={{
                margin: "10px",
                padding: "10px",
                cursor: "pointer",
                width: "300px", // fixed width
              }}
            >
              <div className="card" style={{ height: "100%", width: "100%" }}>
                <img src="..." className="card-img-top" alt="..." style={{ width: "100%" }} />
                <div className="card-body">
                  <h5 className="card-title">{ser.name}</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Services;
