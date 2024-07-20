import {
  getMedicamento,
  getFunciones,
  getMedicamentoById,
  createFunciones,
  createMedicamento,
  updateMedicamento,
  deleteFuncion,
  deleteMedicamento,
} from "../../api/medico/medicamento";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetMedicamento = () => {
  return useQuery({
    queryKey: ["getMedicamento"],
    queryFn: () => getMedicamento(),
    // refetchInterval: 30000,
  });
};

export const useGetFunciones = () => {
  return useQuery({
    queryKey: ["getFunciones"],
    queryFn: () => getFunciones(),
    // refetchInterval: 30000,
  });
};

export const useGetMedicamentoByID = (id_medicamento) => {
  return useQuery({
    queryKey: ["getMedicamentoById", id_medicamento],
    queryFn: () => getMedicamentoById(id_medicamento),
    // refetchInterval: 30000,
  });
};

export const useCreateMedicamento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createMedicamento(data),
    onSuccess: (data) => {
      // console.log("aqui", data);
      queryClient.invalidateQueries("getMedicamento");
      if (data) {
        console.log(data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useCreateFuncion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createFunciones(data),
    onSuccess: (data) => {
      // console.log("aqui", data);
      queryClient.invalidateQueries("getFunciones");
      if (data) {
        console.log(data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteMedicamento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => deleteMedicamento(data),
    onSuccess: (data) => {
      if (data) {
        console.log("mensaje:", data);
        queryClient.invalidateQueries("getMedicamento");
      } else {
        console.log(data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteFuncion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => deleteFuncion(data),
    onSuccess: (data) => {
      if (data) {
        console.log("mensaje:", data);
        queryClient.invalidateQueries("useGetFunciones");
      } else {
        console.log(data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useUpdateMedicamento = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateMedicamento(data),
    onSuccess: (data) => {
      // if (data) {
      // console.log("mensaje:", data);
      queryClient.invalidateQueries("getMedicamento");
      // } else {
      //   console.log(data);
      // }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
