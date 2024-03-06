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
             <div className="card" style={{ width: "288px" }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{ser.name}</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                </div>
              </div>
              <div className="card" style={{ width: "288px" }}>
                <img src="..." className="card-img-top" alt="..." />
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
  );
}

export default Services;
