import {
  getHorariosByPaciente,
  getRecordatoriosByPaciente,
  getRecordatoriosById,
  setReminderAsDone,
  setReminderAsSkipped,
} from "../../api/paciente/horarios.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../storage/auth.js";

export const useGetHorariosByPaciente = () => {
  const { role, user } = useAuthStore();
  const canFetch = role === "paciente" && !!role;

  return useQuery({
    queryKey: ["getHorariosByPaciente"],
    queryFn: () => getHorariosByPaciente(user?.cedula_paciente),
    enabled: canFetch,
  });
};

export const useGetRecordatoriosByPaciente = () => {
  const { role, user } = useAuthStore();
  const canFetch = role === "paciente" && !!role;

  return useQuery({
    queryKey: ["getRecordatoriosByPaciente"],
    queryFn: () => getRecordatoriosByPaciente(user?.cedula_paciente),
    refetchInterval: 30000,
    enabled: canFetch,
  });
};

export const useGetRecordatoriosById = (id_recordatorio) => {
  return useQuery({
    queryKey: ["getRecordatoriosById", id_recordatorio],
    queryFn: () => getRecordatoriosById(id_recordatorio),
  });
};

export const useSetReminderAsDone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id_recordatorio) => setReminderAsDone(id_recordatorio),
    onSuccess: (data) => {
      queryClient.invalidateQueries("getRecordatoriosByPaciente");
      if (data) {
        console.log(data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useSetReminderAsSkipped = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id_recordatorio) => setReminderAsSkipped(id_recordatorio),
    onSuccess: (data) => {
      queryClient.invalidateQueries("getRecordatoriosByPaciente");
      if (data) {
        console.log(data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
