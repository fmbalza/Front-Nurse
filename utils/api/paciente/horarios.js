import api from "../Axios";

export const getHorariosByPaciente = async (cedula_paciente) => {
  try {
    const response = await api.get(`/horario/recordatorios/${cedula_paciente}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
