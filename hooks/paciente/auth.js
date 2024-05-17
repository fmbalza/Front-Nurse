import { doLogin, doVerify, doRegister } from "../../api/paciente/auth.js";
import useAuthStore from "../../storage/auth.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useNavigation } from "@react-navigation/native";

export const usePacienteLogin = () => {
  const login = useAuthStore((state) => state.login);
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => doLogin(data),
    onSuccess: (data) => {
      // console.log("aqui", data);
      login(data.jwt, jwtDecode(data.jwt));
      navigation.navigate("HomePaciente");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useRegisterPaciente = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return useMutation({
    mutationFn: (data) => doRegister(data),
    onSuccess: (data) => {
      console.log("aqui", data);
      // queryClient.invalidateQueries("paciente");
      navigation.navigate("PacienteLogin");
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useVerifyPaciente = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["verifyPaciente"],
    queryFn: () => doVerify(),
    // enabled: false,
  });
};
