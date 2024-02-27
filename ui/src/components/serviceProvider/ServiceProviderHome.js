import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ServiceProviderHome() {
  const selectedStep = {
    1: "category",
    2: "subCategory",
    3: "service",
  };
  // const [servicesProvided, setServicesProvided] = useState([]);
  const [step, setStep] = useState(0);
  const [stepData, setStepData] = useState([]);
  const [serviceDetail, setServiceDetail] = useState({
    category: "",
    subCategory: "",
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
  const handleServiceAdd = async (e) => {
    await axios.post("http://localhost:4000/srv/serviceProvider/addServices", {
      serviceKeys: stepData.filter((data) => data.checked),
    });
  };
  // useEffect(() => {
  //   const services = async () => {
  //     console.log("services");
  //   };
  //   services();
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
  useEffect(() => {
    if (step === 0) return;
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
      {/* <h1>Services</h1>
      <div>
        {servicesProvided.map((ser) => {
          return <div key={ser.key}>{ser.name}</div>;
        })}
      </div>
      <hr /> */}
      {step === 0 && (
        <div>
          <button onClick={handleStepChange}>Add Services</button>
        </div>
      )}
      {step === 1 && (
        <div>
          <h3>Select a category</h3>
          {stepData.map((cat) => {
            return (
              <div onClick={() => handleCategoryChange(cat.key)} key={cat.key}>
                {cat.name}
              </div>
            );
          })}
        </div>
      )}
      {step === 2 && (
        <div>
          <h3>Select a sub category</h3>
          {stepData.map((subCat) => {
            return (
              <div
                onClick={() => handleSubCategoryChange(subCat.key)}
                key={subCat.key}
              >
                {subCat.name}
              </div>
            );
          })}
        </div>
      )}
      {step === 3 && (
        <>
          <h3>Select services</h3>
          {stepData.map((serv, servIndex) => (
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
        </>
      )}
    </div>
  );
}
