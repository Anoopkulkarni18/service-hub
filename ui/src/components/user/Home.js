import axios from "axios";
import React, { useContext, useEffect, useState, useCallback } from "react";
import Category from "./Category";
import SubCategory from "./SubCategory";
import Services from "./Services";
import SubService from "./SubService";
import { CartContext } from "./context/CartContext";

export default function Home() {
  const { dispatch } = useContext(CartContext);
  const [step, setStep] = useState(1);
  const [stepData, setStepData] = useState([]);
  const [serviceDetail, setServiceDetail] = useState({
    category: "",
    subCategory: "",
    service: "",
    subService: "",
  });

  // Debounced step change handler
  const handleStepChange = useCallback(() => {
    setStep((prevStep) => prevStep + 1);
  }, []);

  const handleCategoryChange = (category) => {
    setServiceDetail((prevDetails) => ({
      ...prevDetails,
      category,
    }));
    handleStepChange();
  };

  const handleSubCategoryChange = (subCategory) => {
    setServiceDetail((prevDetails) => ({
      ...prevDetails,
      subCategory,
    }));
    handleStepChange();
  };

  const handleServiceChange = (service) => {
    setServiceDetail((prevDetails) => ({
      ...prevDetails,
      service,
    }));
    handleStepChange();
  };

  const handleSubServiceChange = (subService) => {
    setServiceDetail((prevDetails) => ({
      ...prevDetails,
      subService,
    }));
    handleStepChange();
  };

  const handleBackButton = () => {
    setStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    const selectedStep = {
      1: "category",
      2: "subCategory",
      3: "service",
      4: "subService",
    };
    const getCategories = async () => {
      try {
        const uri = `http://localhost:4000/srv/${selectedStep[step]}/getAll${
          step !== 1 ? `/${serviceDetail[selectedStep[step - 1]]}` : ""
        }`;
        const response = await axios.get(uri);
        setStepData(response.data.map((item) => ({ ...item, checked: false })));
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    getCategories();
  }, [step, serviceDetail.category, serviceDetail.subCategory, serviceDetail.service]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/srv/user/cart`, {
          headers: { token: localStorage.getItem("token") },
        });
        dispatch({ type: "UPDATE", value: response?.data?.cart || [] });
      } catch (error) {
        console.error("Error fetching cart", error);
      }
    };
    fetchCart();
  }, [dispatch]);

  return (
    <div>
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
      {step === 4 && (
        <SubService
          stepData={stepData}
          handleSubServiceChange={handleSubServiceChange}
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
