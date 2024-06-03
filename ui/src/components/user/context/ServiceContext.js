import { createContext, useReducer } from "react";
export const ServiceContext = createContext();

const serviceReducer = (state, action) => {
  switch (action.type) {
    case "SET_TYPE_STEP":
      return { ...state, ...action.value };
    case "SET_STEP_DATA":
      return { ...state, stepData: action.value };
    case "CLEAR":
      return {
        step: 1,
        category: "",
        subCategory: "",
        service: "",
        subService: "",
        stepData: [],
      };
    default:
      return state;
  }
};

export const ServiceContextProvider = (props) => {
  const [serviceState, serviceDispatch] = useReducer(serviceReducer, {
    step: 1,
    category: "",
    subCategory: "",
    service: "",
    subService: "",
    stepData: [],
  });
  return (
    <ServiceContext.Provider value={{ serviceState, serviceDispatch }}>
      {props.children}
    </ServiceContext.Provider>
  );
};
