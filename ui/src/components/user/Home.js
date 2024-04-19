import axios from "axios";
import React, { useEffect, useState } from "react";
import Category from "./Category";
import SubCategory from "./SubCategory";
import Services from "./Services";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Home() {
  const selectedStep = {
    1: "category",
    2: "subCategory",
    3: "service",
    4: "subService",
  };
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [stepData, setStepData] = useState([]);
  const [serviceDetail, setServiceDetail] = useState({
    category: "",
    subCategory: "",
    service: "",
  });
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
  const handleServiceChange = (service) => {
    setServiceDetail({
      ...serviceDetail,
      service,
    });
    handleStepChange();
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
    getCategories();
  }, [step]);

  return (
    <div>
      <Navbar />
      {step === 0 && (
        <div>
          <button onClick={handleStepChange}>Add Services</button>
        </div>
      )}
      {step === 1 && (
        <Category
          stepData={stepData}
          handleCategoryChange={handleCategoryChange}
        />
      )}
      {step === 2 && (
        <SubCategory
          stepData={stepData}
          handleSubCategoryChange={handleSubCategoryChange}
        />
      )}
      {step === 3 && (
        <Services
          stepData={stepData}
          handleServiceChange={handleServiceChange}
        />
      )}
      {step !== 1 && (
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
