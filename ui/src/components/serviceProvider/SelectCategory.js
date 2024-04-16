import React from "react";

function SelectCategory({ stepData, handleCategoryChange }) {
  return (
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Select a category
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >
        {stepData.map((cat) => {
          return (
            <div
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              style={{
                margin: "10px",
                cursor: "pointer",
                width: "288px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" // Add shadow
              }}
            >
              <div
                className="card"
                style={{
                  height: "100%",
                  width: "100%",
                  border: "none" // Make border invisible
                }}
              >
                <img
                  src="..."
                  className="card-img-top"
                  alt="..."
                  style={{ width: "100%" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{cat.name}</h5>
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

export default SelectCategory;
