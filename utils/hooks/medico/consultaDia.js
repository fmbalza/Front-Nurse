import {
  getConsultasDia,
  createConsulta,
  deleteConsulta,
  updateConsulta,
  getConsulta,
  appendToConsulta,
} from "../../api/medico/consultaDia";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import useAuthStore from "../../storage/auth";
// import { jwtDecode } from "jwt-decode";
// import { useNavigation } from "@react-navigation/native";

export const useConsultasDia = () => {
  const { role } = useAuthStore.getState();
  const canFetch = role === "medico" && !!role;
  return useQuery({
    queryKey: ["consultasDia"],
    queryFn: () => getConsultasDia(),
    refetchInterval: 30000,
    enabled: canFetch,
    placeholderData: keepPreviousData,
  });
};

export const useCreateConsulta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createConsulta(data),
    onSuccess: (data) => {
      // console.log("Aqui en consultaDia.js: ", data);
      queryClient.invalidateQueries("consultasDia");
      queryClient.invalidateQueries("getPacienteConsulta", data);
      // if (data === "Consulta creada exitosamente") {
      //   console.log("La consulta se creo exitosamente");
      // }
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
      // if (data) {
      // console.log("mensaje:", data);
      queryClient.invalidateQueries("consultasDia");
      // } else {
      //   console.log(data);
      // }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useAppendToConsulta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id_consulta, data) => appendToConsulta(id_consulta, data),
    onSuccess: (data) => {
      // if (data) {
      //   console.log("mensaje:", data);
      queryClient.invalidateQueries("consultasDia");
      // } else {
      //   console.log(data);
      // }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
