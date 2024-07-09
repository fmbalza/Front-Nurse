import api from "../Axios";

export const getTratamiento = async () => {
  try {
    const response = await api.get("/tratamiento");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createTratamiento = async (data) => {
  try {
    // console.log("aqui", data);
    const response = await api.post("/tratamiento", data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getTratamientoById = async (id_tratamiento) => {
  try {
    const response = await api.get(`/tratamiento/${id_tratamiento}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTratamiento = async (id_tratamiento, data) => {
  try {
    // console.log("aqui id_tratamiento: ", id_tratamiento);
    // console.log("aqui dat: ", data);
    const response = await api.put(`/tratamiento/${id_tratamiento}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTratamiento = async (id_tratamiento) => {
  try {
    const response = await api.delete(`/tratamiento/${id_tratamiento}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCategorias = async () => {
  try {
    const response = await api.get("/tratamiento/categoria");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
