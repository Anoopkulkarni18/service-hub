import axios from "axios";

export const getStepData = async (serviceState) => {
  const selectedStep = {
    1: "category",
    2: "subCategory",
    3: "service",
    4: "subService",
  };
  const { step } = serviceState;
  const uri = `http://localhost:4000/srv/${selectedStep[step]}/getAll${
    step !== 1 ? `/${serviceState[selectedStep[step - 1]]}` : ""
  }`;
  return (await axiosRequest("get", uri)).map((item) => {
    return {
      ...item,
      checked: false,
    };
  });
};

export const axiosRequest = async (method, uri, body = null, token = null) => {
  const config = {
    method: method,
    url: uri,
    headers: {},
  };

  if (token) {
    config.headers["token"] = token;
  }

  if (body) {
    config.data = body;
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
