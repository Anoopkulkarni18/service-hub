import React, { useContext, useEffect } from "react";
import { ServiceContext } from "./context/ServiceContext";
import { getStepData } from "./util/fetchService";

function Category() {
  const { serviceState, serviceDispatch } = useContext(ServiceContext);
  const handleCategoryChange = (category) => {
    serviceDispatch({
      type: "SET_TYPE_STEP",
      value: { category, step: serviceState.step + 1 },
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const value = await getStepData(serviceState);
      serviceDispatch({
        type: "SET_STEP_DATA",
        value,
      });
    };
    getCategories();
  }, []);

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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {serviceState?.stepData?.map((cat) => (
            <div
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              style={{
                margin: "10px",
                padding: "10px",
                cursor: "pointer",
                width: "calc(33.33% - 20px)", // Adjusted width to account for margins and gap
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // add shadow
                borderRadius: "8px", // add border radius
                overflow: "hidden", // hide overflow
              }}
            >
              <div
                className="card"
                style={{ height: "100%", width: "100%", border: "none" }}
              >
                {" "}
                {/* remove border */}
                <img
                  src={`/${cat.key}.webp`}
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
          ))}
        </div>
      </div>
      <div style={{ width: "40%" }}>
        {/* Keep the image tag as it is */}
        <img
          src="/sideImage.jpg"
          alt="sideImg"
          style={{ width: "100%", height: "auto" }}
        />{" "}
        {/* Image on the right side */}
      </div>
    </div>
  );
}

export default Category;
