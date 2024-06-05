import axios from "axios";
import React, { useEffect, useState } from "react";
import SelectCategory from "./SelectCategory";
import SelectSubCategory from "./SelectSubCategory";
import SelectServices from "./SelectServices";

export default function ServiceProviderHome() {
  const [servicesProvided, setServicesProvided] = useState([]);
  const [step, setStep] = useState(0);
  const [stepData, setStepData] = useState([]);
  const [serviceDetail, setServiceDetail] = useState({
    category: "",
    subCategory: "",
  });
  const handleStepChange = () => {
    setStep(step + 1);
  };
  const cardContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    margin: "20px 0",
  };

  const cardStyle = {
    width: "288px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const cardImageStyle = {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  };

  const cardBodyStyle = {
    padding: "16px",
    textAlign: "center",
  };

  const cardTitleStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const cardTextStyle = {
    fontSize: "1rem",
    color: "#555",
  };
  const handleCategoryChange = (category) => {
    setServiceDetail({
      ...serviceDetail,
      category,
    });
    handleStepChange();
  };
  const handleSubCategoryChange = (subCategory) => {
    setServiceDetail({
      ...serviceDetail,
      subCategory,
    });
    handleStepChange();
  };
  const handleServiceAdd = async (e) => {
    await axios.post(
      "http://localhost:4000/srv/serviceProvider/addServices",
      {
        serviceKeys: stepData.filter((data) => data.checked),
      },
      { headers: { token: localStorage.getItem("token") } }
    );
    setStepData([]);
    setStep(0);
  };
  const handleCheckBoxChange = (event) => {
    const { id } = event.target;
    setStepData(
      stepData.map((item) => {
        return {
          ...item,
          checked: item.key === id ? !item.checked : item.checked,
        };
      })
    );
  };
  const handleBackButton = () => {
    setStep(step - 1);
  };
  useEffect(() => {
    const selectedStep = {
      1: "category",
      2: "subCategory",
      3: "service",
    };
    const getCategories = async () => {
      const uri = `http://localhost:4000/srv/${selectedStep[step]}/getAll${
        step !== 1 ? `/${serviceDetail[selectedStep[step - 1]]}` : ""
      }`;
      setStepData(
        (await axios.get(uri)).data.map((item) => {
          return {
            ...item,
            checked: false,
          };
        })
      );
    };
    const getProviderServices = async () => {
      setServicesProvided(
        (
          await axios.get(
            "http://localhost:4000/srv/serviceProvider/getServices",
            { headers: { token: localStorage.getItem("token") } }
          )
        ).data.servicesProvided
      );
    };
    step === 0 ? getProviderServices() : getCategories();
  }, [step, serviceDetail]);

  const handleRemoveService = async (serviceKey) => {
    await axios.get(
      `http://localhost:4000/srv/serviceProvider/removeService/${serviceKey}`,
      { headers: { token: localStorage.getItem("token") } }
    );
    setServicesProvided(
      servicesProvided.filter((item) => item.serviceKey !== serviceKey)
    );
  };

  return (
    <div style={{ paddingTop: "56px", textAlign: "center" }}>
      <h3 style={{marginTop:"20px"}} >Services</h3>

      <div style={cardContainerStyle}>
        {servicesProvided.map((ser) => (
          <div key={ser.serviceKey} style={cardStyle}>
            <img
              src="..."
              className="card-img-top"
              alt="..."
              style={cardImageStyle}
            />
            <div className="card-body" style={cardBodyStyle}>
              <h5 className="card-title" style={cardTitleStyle}>
                {ser.serviceName}
              </h5>
              <p className="card-text" style={cardTextStyle}></p>
            </div>
            <button
              onClick={() => {
                handleRemoveService(ser.serviceKey);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            onClick={handleStepChange}
            style={{
              padding: "10px 20px",
              fontSize: "1rem",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "background-color 0.3s ease",
            }}
          >
            Add Services
          </button>
        </div>
      )}
      {step === 1 && (
        <SelectCategory
          stepData={stepData}
          handleCategoryChange={handleCategoryChange}
        />
      )}
      {step === 2 && (
        <SelectSubCategory
          stepData={stepData}
          handleSubCategoryChange={handleSubCategoryChange}
        />
      )}
      {step === 3 && (
        <SelectServices
          stepData={stepData}
          handleCheckBoxChange={handleCheckBoxChange}
          handleServiceAdd={handleServiceAdd}
          servicesProvided={servicesProvided.map((srv) => srv.serviceKey)}
        />
      )}
      {step !== 0 && (
        <button
          onClick={handleBackButton}
          style={{
            margin: "20px auto",
            padding: "10px 20px",
            backgroundColor: "lightgray",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            display: "block",
          }}
        >
          Back
        </button>
      )}
    </div>
  );
}
