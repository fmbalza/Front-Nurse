import { getConsultasById } from "../../api/paciente/consultas";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "../../storage/auth";

export const useGetConsultasById = () => {
  const { role } = useAuthStore.getState();
  const canFetch = role === "paciente" && !!role;
  return useQuery({
    queryKey: ["getConsultasById"],
    queryFn: () => getConsultasById(),
    refetchInterval: 30000,
    enabled: canFetch,
  });
};
