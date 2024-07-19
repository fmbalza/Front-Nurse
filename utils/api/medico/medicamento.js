import api from "../Axios";

export const getMedicamento = async () => {
  try {
    const response = await api.get("/medicamento");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createMedicamento = async (data) => {
  try {
    // console.log("aqui", data);
    const response = await api.post("/medicamento", data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFunciones = async () => {
  try {
    const response = await api.get("/medicamento/funcion");
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createFunciones = async (data) => {
  try {
    // console.log("aqui", data);
    const response = await api.post("/medicamento/funcion", data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateMedicamento = async (data) => {
  try {
    console.log("aqui", data);
    const response = await api.put(
      `/medicamento/${data.id_medicamento}`,
      data.request
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMedicamentoById = async (id_medicamento) => {
  try {
    const response = await api.get(`/medicamento/${id_medicamento}`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteFuncion = async (data) => {
  try {
    console.log("aqui", data);
    const response = await api.delete(`/medicamento/funcion`, data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteMedicamento = async (data) => {
  try {
    console.log("aqui", data);
    const response = await api.delete(`/medicamento/${data}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
