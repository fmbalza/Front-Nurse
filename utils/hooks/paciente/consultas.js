import { getConsultasById } from "../../api/paciente/consultas";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetConsultasById = () => {
  return useQuery({
    queryKey: ["getConsultasById"],
    queryFn: () => getConsultasById(),
    refetchInterval: 30000,
  });
};
