import api from "../Axios";

export const doLogin = async (data) => {
  try {
    const response = await api.post("/paciente/login", data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const doVerify = async () => {
  try {
    const response = await api.get("/verify");
    // console.log("verifyPaciente", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const doRegister = async (data) => {
  try {
    const response = await api.post("/paciente", data);
    // console.log("response", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const doUpdate = async (data) => {
  try {
    const response = await api.put("/paciente", data);
    // console.log("response", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
