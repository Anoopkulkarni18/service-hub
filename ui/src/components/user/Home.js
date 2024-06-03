import React, { useContext, useEffect } from "react";
import Category from "./Category";
import SubCategory from "./SubCategory";
import Services from "./Services";
import SubService from "./SubService";
import { CartContext } from "./context/CartContext";
import { ServiceContext } from "./context/ServiceContext";
import { axiosRequest } from "./util/fetchService";

export default function Home() {
  const { cartDispatch } = useContext(CartContext);
  const { serviceState, serviceDispatch } = useContext(ServiceContext);

  const handleBackButton = () => {
    serviceDispatch({
      type: "SET_TYPE_STEP",
      value: { step: serviceState.step - 1 },
    });
  };
  useEffect(() => {
    const fetchCart = async () => {
      const response = await axiosRequest(
        "get",
        `http://localhost:4000/srv/user/cart`,
        null,
        localStorage.getItem("token")
      );
      cartDispatch({ type: "UPDATE", value: response?.cart || [] });
    };
    fetchCart();
  }, [cartDispatch]);

  return (
    <div>
      {serviceState.step === 1 && <Category />}
      {serviceState.step === 2 && <SubCategory />}
      {serviceState.step === 3 && <Services />}
      {serviceState.step === 4 && <SubService />}
      {serviceState.step !== 1 && (
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
