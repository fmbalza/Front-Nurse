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
    console.log("aqui", data);
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

export const updateTratamiento = async (data) => {
  try {
    console.log("aqui data: ", data);
    const response = await api.put(
      `/tratamiento/${data.id_tratamiento}`,
      data.request
    );
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
