import api from "../Axios";
import useAuthStore from "../../storage/auth";

export const doLogin = async (data) => {
  try {
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
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const doUpdate = async (data) => {
  const { user } = useAuthStore.getState();
  try {
    const response = await api.put(`/medico/${user.cedula_medico}`, data);
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

export const getMe = async () => {
  const { user } = useAuthStore.getState();
  try {
    const response = await api.get(`/medico/${user.cedula_medico}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
