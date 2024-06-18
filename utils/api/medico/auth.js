import api from "../Axios";

export const doLogin = async (data) => {
  try {
    // console.log("aqui", data);
    const response = await api.post("/medico/login", data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const doVerify = async () => {
  try {
    const response = await api.get("/verify");
    // console.log("verifyMedico", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const doRegister = async (data) => {
  try {
    const response = await api.post("/medico", data);
    // console.log("response", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const doUpdate = async (data) => {
  try {
    const response = await api.put("/medico", data);
    // console.log("response", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const requestCertificado = async (id, url) => {
  try {
    const response = await api.post(`/medico/certify/${id}`, url);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
