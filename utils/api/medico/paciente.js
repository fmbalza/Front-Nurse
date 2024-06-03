import api from "../Axios";
import useAuthStore from "../../storage/auth";

export const getPaciente = async () => {
  try {
    const response = await api.get("/paciente");
 
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getPacienteMedico = async () => {
  try {
    const { user } = useAuthStore.getState()
    const cedulaMedico = user.cedula_medico
    
    const response = await api.get(`medico/subject/${cedulaMedico}`);

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


