import api from "../../api/Axios";

export const createHorario = async (data) => {
  try {
    const response = await api.post("/horario", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteHorario = async (id_horario) => {
  try {
    const response = await api.delete(`/horario/${id_horario}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
