import { getMedico, getMedicoByName } from "../../api/paciente/buscarDoctor";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { jwtDecode } from "jwt-decode";
// import { useNavigation } from "@react-navigation/native";

export const useGetMedico = () => {
  return useQuery({
    queryKey: ["getMedico"],
    queryFn: () => getMedico(),
    staleTime: 30000,
  });
};

export const useGetMedicoByName = (name) => {
    return useQuery({
      queryKey: ["getMedicoByName", name],
      queryFn: () => getMedicoByName(name),
      // staleTime: 5000,
    });
  };