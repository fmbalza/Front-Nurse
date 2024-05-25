import { getEspecialidades } from "../../api/medico/especialidades.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { jwtDecode } from "jwt-decode";
// import { useNavigation } from "@react-navigation/native";

export const useEspecialidades = () => {
  return useQuery({
    queryKey: ["especialidades"],
    queryFn: () => getEspecialidades(),
    // staleTime: 5000,
  });
};
