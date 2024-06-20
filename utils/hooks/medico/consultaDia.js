import { getConsultasDia, createConsulta } from "../../api/medico/consultaDia";
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
      // console.log("aqui", data);
      queryClient.invalidateQueries("consultasDia");
      // if (data === "Consulta creada exitosamente") {
      //   console.log("La consulta se creo exitosamente");
      // }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
