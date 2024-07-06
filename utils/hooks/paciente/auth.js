import { doLogin, doVerify, doRegister } from "../../api/paciente/auth.js";
import useAuthStore from "../../storage/auth.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useNavigation } from "@react-navigation/native";

export const usePacienteLogin = () => {
  const login = useAuthStore((state) => state.login);
  const setRole = useAuthStore((state) => state.setRole);
  const setPushToken = useAuthStore((state) => state.setPushToken);
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => doLogin(data),
    onSuccess: (data) => {
      const user = jwtDecode(data.jwt);
      login(data.jwt, user);
      setRole("paciente");
      setPushToken(user.push_token);
      queryClient.invalidateQueries("getConsultasById");
      navigation.reset({
        index: 0,
        routes: [{ name: "HomePaciente" }],
      });
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
      // console.log("aqui", data);
      // queryClient.invalidateQueries("paciente");
      if (data === "Paciente creado exitosamente") {
        navigation.navigate("PacienteLogin");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useVerifyPaciente = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const role = useAuthStore((state) => state.role);
  const rememberMe = useAuthStore((state) => state.rememberMe);

  return useQuery({
    queryKey: ["verifyPaciente"],
    queryFn: () => doVerify(),
    enabled: rememberMe && role === "paciente",
  });
};
