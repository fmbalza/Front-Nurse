import api from "../Axios";

export const getHorariosByPaciente = async (cedula_paciente) => {
  try {
    const response = await api.get(`/horario/paciente/${cedula_paciente}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getHorariosById = async (id_horario) => {
  try {
    const response = await api.get(`/horario/${id_horario}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getRecordatoriosByPaciente = async (cedula_paciente) => {
  try {
    const response = await api.get(`/horario/recordatorios/${cedula_paciente}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getRecordatoriosById = async (id_recordatorio) => {
  try {
    const response = await api.get(`/horario/recordatorios/${id_recordatorio}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const setReminderAsSkipped = async (id_recordatorio) => {
  try {
    const response = await api.put(
      `/horario/recordatorios/skipped/${id_recordatorio}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const setReminderAsDone = async (id_recordatorio) => {
  try {
    const response = await api.put(
      `/horario/recordatorios/done/${id_recordatorio}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
