import React from "react";

function SelectCategory({ stepData, handleCategoryChange }) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div
        style={{
          width: "60%",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Select a category
        </h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {stepData.map((cat) => {
            return (
              <div
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                style={{
                  margin: "10px",
                  padding: "10px",
                  cursor: "pointer",
                  width: "calc(33.33% - 20px)",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <div
                  className="card"
                  style={{ height: "100%", width: "100%", border: "none" }}
                >
                  <img
                    src={`${cat.key}.webp`}
                    className="card-img-top"
                    alt={cat.name}
                    style={{ width: "100%", borderRadius: "8px 8px 0 0" }}
                  />
                  <div className="card-body" style={{ padding: "10px" }}>
                    <h5
                      className="card-title"
                      style={{
                        fontSize: "12px",
                        margin: "5px 0",
                        textAlign: "left",
                      }}
                    >
                      {cat.name}
                    </h5>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ width: "40%" }}>
        <img
          src="path_to_image"
          alt="sideImg"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}

export default SelectCategory;
