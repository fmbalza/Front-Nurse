import api from "../Axios";

export const getConsultasDia = async () => {
  try {
    const response = await api.get("/consulta/medico");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
