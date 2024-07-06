import api from "../Axios";

export const getConsultasById = async () => {
  try {
    const response = await api.get(`/consulta/paciente`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
