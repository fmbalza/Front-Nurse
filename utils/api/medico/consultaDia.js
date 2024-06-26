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

export const createConsulta = async (data) => {
  try {
    // console.log("aqui", data);
    const response = await api.post("/consulta", data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};


export const deleteConsulta = async (data) => {
  try {
    console.log("aqui", data);
    const response = await api.delete(`/consulta/${data}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error);
    
  }
};