import {
  getConsultasDia,
  createConsulta,
  deleteConsulta,
  updateConsulta,
  getConsulta,
} from "../../api/medico/consultaDia";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { jwtDecode } from "jwt-decode";
// import { useNavigation } from "@react-navigation/native";

export const useConsultasDia = () => {
  return useQuery({
    queryKey: ["consultasDia"],
    queryFn: () => getConsultasDia(),
    refetchInterval: 30000,
  });
};

export const useCreateConsulta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createConsulta(data),
    onSuccess: (data) => {
      console.log("Aqui en consultaDia.js: ", data);
      queryClient.invalidateQueries("consultasDia");
      queryClient.invalidateQueries("getPacienteConsulta", data);
      if (data === "Consulta creada exitosamente") {
        console.log("La consulta se creo exitosamente");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useDeleteConsulta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => deleteConsulta(data),
    onSuccess: (data) => {
      if (data) {
        console.log("mensaje:", data);
        queryClient.invalidateQueries("consultasDia");
      } else {
        console.log(data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useGetConsulta = (id_consulta) => {
  return useQuery({
    queryKey: ["getConsulta", id_consulta],
    queryFn: () => getConsulta(id_consulta),
    // refetchInterval: 30000,
  });
};

export const useUpdateConsulta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ idconsulta, data }) => updateConsulta(idconsulta, data),
    onSuccess: (data) => {
      if (data) {
        console.log("mensaje:", data);
        queryClient.invalidateQueries("consultasDia");
      } else {
        console.log(data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
