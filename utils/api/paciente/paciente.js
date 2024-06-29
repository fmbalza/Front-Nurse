import api from "../Axios";
import useAuthStore from "../../../utils/storage/auth";

export const putUpdatePaciente = async (data) => {
  const { user } = useAuthStore.getState();
  const cedula = user.cedula_paciente;
  try {
    const response = await api.put(`/paciente/${cedula}`, data);
    // console.log("sexo",response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMe = async () => {
  const { user } = useAuthStore.getState();
  const cedula = user.cedula_paciente;
  try {
    console.log("Aqui en paciente.js: ", cedula);
    const response = await api.get(`/paciente/${cedula}`);
    // console.log("sexo",response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMisMedicos = async () => {
  const { user } = useAuthStore.getState();
  const cedula = user.cedula_paciente;
  try {
    console.log("Aqui en paciente.js: ", cedula);
    const response = await api.get(`/paciente/caregiver/${cedula}`);
    // console.log("sexo",response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
