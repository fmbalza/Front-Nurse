import { getConsultasDia } from "../../api/medico/consultaDia"; 
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { jwtDecode } from "jwt-decode";
// import { useNavigation } from "@react-navigation/native";

export const useConsultasDia = () => {
  return useQuery({
    queryKey: ["consultasDia"],
    queryFn: () => getConsultasDia(),
    // staleTime: 5000,
  });
};
