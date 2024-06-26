import { getPaciente, getPacienteConsulta, getPacienteMedico, postAssignPaciente, deleteRemovePaciente } from "../../api/medico/paciente";
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


export const useAssignPaciente = () => {
  const queryClient = useQueryClient();
 

  return useMutation({
    mutationFn: (data) => postAssignPaciente(data),
    onSuccess: (data) => {
    
      // queryClient.invalidateQueries("paciente");
      if (data === "Paciente asignado exitosamente") {
        console.log("Paciente asignado exitosamente")
        queryClient.invalidateQueries('getPacienteMedico')
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};


export const useDeleteAsPaciente = () => {
  const queryClient = useQueryClient();
 
  
  return useMutation({
    
    mutationFn: (data) => deleteRemovePaciente(data),
    onSuccess: (data) => {
     
      if (data === "Paciente removido exitosamente") {
        console.log("Paciente removido exitosamente")
        queryClient.invalidateQueries('getPacienteMedico')
      }else{ console.log(data)}
    },
    onError: (error) => {
      console.log(error);
    },
  });
};