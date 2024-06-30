import { getConsultasById } from "../../api/paciente/consultas";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../storage/auth.js";

export const useGetConsultasById = () => {
  const { user } = useAuthStore.getState();

  return useQuery({
    queryKey: ["getConsultasById"],
    queryFn: () => getConsultasById(user?.cedula_paciente),
    refetchInterval: 30000,
    enabled: !!user?.cedula_paciente,
  });
};
