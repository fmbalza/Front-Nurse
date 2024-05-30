import api from "../Axios";

export const getPaciente = async () => {
  try {
    const response = await api.get("/paciente");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};


export const getPacienteConsulta = async (cedula) => {
  try {
    const response = await api.get(`/consulta/paciente/${cedula}`);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};


