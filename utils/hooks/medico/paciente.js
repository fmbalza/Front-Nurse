import { getPaciente, getPacienteConsulta, getPacienteMedico } from "../../api/medico/paciente";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { jwtDecode } from "jwt-decode";
// import { useNavigation } from "@react-navigation/native";

export const useGetPaciente = () => {
  return useQuery({
    queryKey: ["getPaciente"],
    queryFn: () => getPaciente(),
    // staleTime: 5000,
  });
};

export const useGetPacienteMedico = () => {
  return useQuery({
    queryKey: ["getPacienteMedico"],
    queryFn: () => getPacienteMedico(),
    // staleTime: 5000,
  });
};



export const useGetPacienteConsulta = (cedula) => {
  return useQuery({
    queryKey: ["getPacienteConsulta", cedula],
    queryFn: () => getPacienteConsulta(cedula),
    // staleTime: 5000,
  });
};
