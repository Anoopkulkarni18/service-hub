import axios from "axios";
import React, { useEffect, useState } from "react";
import SelectCategory from "./SelectCategory";
import SelectSubCategory from "./SelectSubCategory";
import SelectServices from "./SelectServices";
import { useNavigate } from "react-router-dom";

export default function ServiceProviderHome() {
  const selectedStep = {
    1: "category",
    2: "subCategory",
    3: "service",
  };
  const [servicesProvided, setServicesProvided] = useState([]);
  const [step, setStep] = useState(0);
  const [stepData, setStepData] = useState([]);
  const [serviceDetail, setServiceDetail] = useState({
    category: "",
    subCategory: "",
  });
  const navigate = useNavigate();
  const handleStepChange = () => {
    setStep(step + 1);
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
  // useEffect(() => {
  //   navigate("/service-provider-login");
  // }, []);
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
  }, [step]);
  return (
    <div>
      <h1>Services</h1>
      {servicesProvided.map((ser) => {
        return (
          <div key={ser.serviceKey}>
            <div className="card" style={{ width: "288px" }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{ser.serviceName}</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div className="card" style={{ width: "288px" }}>
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{ser.serviceName}</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <hr />
      {step === 0 && (
        <div>
          <button onClick={handleStepChange}>Add Services</button>
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
      {step !== 0 && <button onClick={handleBackButton}>Back</button>}
    </div>
  );
}
