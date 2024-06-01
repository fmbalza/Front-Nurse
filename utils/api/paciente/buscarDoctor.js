import api from "../Axios";

export const getMedico = async () => {
  try {
    const response = await api.get("/medico");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMedicoByName = async (name) => {
    try {
      const response = await api.get(`/medico/name/${name}`);
  
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  };

