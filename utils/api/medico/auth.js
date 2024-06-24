import api from "../Axios";
import useAuthStore from "../../storage/auth";

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
    // console.log("response", response.data);
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
  const { user } = useAuthStore.getState()
  const cedula = user.cedula_medico
  try {
    const response = await api.put(`/medico/${cedula}`, data);
    // console.log("response", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};


export const getMe = async () => {
  const { user } = useAuthStore.getState()
  const cedula = user.cedula_medico
  try {
    
    console.log(cedula)
    const response = await api.get(`/medico/${cedula}`);
    // console.log("sexo",response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};