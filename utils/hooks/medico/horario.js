import { createHorario, deleteHorario } from "../../api/medico/horario";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateHorario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createHorario(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries("getConsulta", data?.id_consulta);
      if (data) {
        console.log(data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteHorario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id_horario) => deleteHorario(id_horario),
    onSuccess: (data) => {
      queryClient.invalidateQueries("getConsulta");
      if (data) {
        console.log(data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
