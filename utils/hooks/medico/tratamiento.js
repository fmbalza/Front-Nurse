import {
  getTratamiento,
  createTratamiento,
  getTratamientoById,
  updateTratamiento,
  deleteTratamiento,
  getCategorias,
} from "../../api/medico/tratamiento.js";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetTratamiento = () => {
  return useQuery({
    queryKey: ["getTratamiento"],
    queryFn: () => getTratamiento(),
    // refetchInterval: 30000,
  });
};

export const useGetCategorias = () => {
  return useQuery({
    queryKey: ["getCategorias"],
    queryFn: () => getCategorias(),
    // refetchInterval: 30000,
  });
};

export const useGetTratamientoByID = (id_tratamiento) => {
  return useQuery({
    queryKey: ["getTratamientoById", id_tratamiento],
    queryFn: () => getTratamientoById(id_tratamiento),
    // refetchInterval: 30000,
  });
};

export const useCreateTratamiento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createTratamiento(data),
    onSuccess: (data) => {
      // console.log("aqui", data);
      queryClient.invalidateQueries("getTratamiento");
      if (data) {
        console.log(data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useUpdateTratamiento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateTratamiento(data),
    onSuccess: (data) => {
      // console.log("aqui", data);
      queryClient.invalidateQueries("getTratamiento");
      if (data) {
        console.log(data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteTratamiento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id_tratamiento) => deleteTratamiento(id_tratamiento),
    onSuccess: (data) => {
      // console.log("aqui", data);
      queryClient.invalidateQueries("getTratamiento");
      if (data) {
        console.log(data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
