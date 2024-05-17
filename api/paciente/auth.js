import api from "../Axios";

export const doLogin = async (values) => {
  try {
    const response = await api.post("/paciente/login", values);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
