import React, { useEffect } from "react";

function SelectServices({ stepData, handleCheckBoxChange, handleServiceAdd, servicesProvided }) {
  return (
    <div>
      <h3>Select services</h3>
      {stepData.filter(item => !servicesProvided.includes(item.key)).map((serv, servIndex) => (
        <div key={serv.key}>
          <input
            type="checkbox"
            id={serv.key}
            name={serv.name}
            value={serv.name}
            onChange={handleCheckBoxChange}
            checked={stepData[servIndex].checked}
          />
          <label htmlFor={serv.key}>{serv.name}</label>
        </div>
      ))}
      <button onClick={handleServiceAdd} type="button">
        Submit
      </button>
    </div>
  );
}

export default SelectServices;
