import React from "react";

function Services({ stepData, handleServiceChange }) {
  return (
    <div>
      <h3>Select a sub category</h3>
      {stepData.map((ser) => {
        return (
          <div
            onClick={() => handleServiceChange(ser.key)}
            key={ser.key}
          >
            {ser.name}
          </div>
        );
      })}
    </div>
  );
}

export default Services;
