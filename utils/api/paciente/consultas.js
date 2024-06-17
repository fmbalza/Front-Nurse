import api from "../Axios";
import useAuthStore from '../../../utils/storage/auth';

export const getConsultasById = async () => {

  try {
    const { user } = useAuthStore.getState()
    console.log("cedula:",user.cedula_paciente)
    const response = await api.get(`/consulta/paciente`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};