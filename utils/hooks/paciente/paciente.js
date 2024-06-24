import {
  putUpdatePaciente,
  getMe,
  getMisMedicos,
} from "../../api/paciente/paciente";
import useAuthStore from "../../storage/auth";
import { jwtDecode } from "jwt-decode";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatePaciente = () => {
  const login = useAuthStore((state) => state.login);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => putUpdatePaciente(data),
    onSuccess: (data) => {
      // console.log("aqui", data);
      const user = jwtDecode(data.jwt);
      login(data.jwt, user);
      if (data.msg === "Paciente actualizado exitosamente") {
        console.log("Los datos se cambiaron exitosamente");
        queryClient.invalidateQueries("getMePaciente");
      } else {
        console.error("Error al actualizar los datos");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["getMePaciente"],
    queryFn: () => getMe(),
    // staleTime: 5000,
  });
};

export const useGetMisMedicos = () => {
  return useQuery({
    queryKey: ["getMisMedicos"],
    queryFn: () => getMisMedicos(),
    // staleTime: 5000,
  });
};
