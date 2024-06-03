import React, { useEffect } from "react";
import { useContext } from "react";
import { ServiceContext } from "./context/ServiceContext";
import { getStepData } from "./util/fetchService";

function SubCategory() {
  const { serviceState, serviceDispatch } = useContext(ServiceContext);

  const handleSubCategoryChange = (subCategory) => {
    serviceDispatch({
      type: "SET_TYPE_STEP",
      value: { subCategory, step: serviceState.step + 1 },
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
    <div>
      <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
        Select a sub category
      </h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {serviceState.stepData.map((subCat, index) => (
          <div
            key={subCat.key}
            onClick={() => handleSubCategoryChange(subCat.key)}
            style={{
              margin: "10px",
              padding: "10px",
              cursor: "pointer",
              width: "300px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // add shadow
              borderRadius: "10px", // add border radius
              overflow: "hidden", // hide overflow
            }}
          >
            <div
              className="card"
              style={{ height: "100%", width: "100%", border: "none" }}
            >
              <img
                src={`/${subCat.key}.jpeg`}
                className="card-img-top"
                alt="..."
                style={{ width: "100%" }}
              />
              <div className="card-body">
                <h5 className="card-title">{subCat.name}</h5>
                <p className="card-text"></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubCategory;
