import { putUpdatePaciente, getMe, getMisMedicos } from "../../api/paciente/paciente";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatePaciente = () => {
    const queryClient = useQueryClient();
   
  
    return useMutation({
      mutationFn: (data) => putUpdatePaciente(data),
      onSuccess: (data) => {
        // console.log("aqui", data);
        // queryClient.invalidateQueries("paciente");
        if (data === 'Paciente actualizado exitosamente') {
          console.log("Los datos se cambiaron exitosamente");
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
      queryKey: ["getMe"],
      queryFn: () => getMe(),
      // staleTime: 5000,
    });
  }


  export const useGetMisMedicos = () => {
    return useQuery({
      queryKey: ["getMisMedicos"],
      queryFn: () => getMisMedicos(),
      // staleTime: 5000,
    });
  }