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
    // console.log("Aqui en consultaDia.js: ", data);
    const response = await api.delete(`/consulta/${data}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateConsulta = async (idconsulta, data) => {
  try {
    // console.log("aqui idconsulta", idconsulta);
    // console.log("aqui data", data);
    const response = await api.put(`/consulta/${idconsulta}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getConsulta = async (id_consulta) => {
  try {
    // console.log("aqui", data);
    const response = await api.get(`/consulta/${id_consulta}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
