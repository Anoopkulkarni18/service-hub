import React from "react";

function SelectServices({
  stepData,
  handleCheckBoxChange,
  handleServiceAdd,
  servicesProvided,
}) {
  return (
    <div>
      <h3>Select services</h3>
      {stepData
        .filter((item) => !servicesProvided.includes(item.key))
        .map((serv, servIndex) => (
          <div
            key={serv.key}
            className="card"
            style={{
              width: "288px",
              margin: "20px auto",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              border: "none",
              textAlign: "center",
            }}
          >
            <img
              src={`/${serv.key}.jpeg`}
              className="card-img-top"
              alt={serv.name}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <input
                type="checkbox"
                id={serv.key}
                name={serv.name}
                value={serv.name}
                onChange={handleCheckBoxChange}
                checked={stepData[servIndex].checked}
              />
              <label htmlFor={serv.key}>
                <b>{serv.name}</b>
              </label>
            </div>
          </div>
        ))}
      <button
        style={{
          display: "block",
          margin: "20px auto",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handleServiceAdd}
        type="button"
      >
        Submit
      </button>
    </div>
  );
}

export default SelectServices;
