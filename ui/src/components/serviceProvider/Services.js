import React from "react";

function Services({ services, handleCheckBoxChange }) {
  return (
    <>
      <h3>Select services</h3>
      {services.map((serv, servIndex) => (
        <div key={serv.key}>
          <input
            type="checkbox"
            id={serv.key}
            name={serv.name}
            value={serv.name}
            onChange={handleCheckBoxChange}
            checked={serv.checked}
          />
          <label htmlFor={serv.key}>{serv.name}</label>
        </div>
      ))}
    </>
  );
}

export default Services;
