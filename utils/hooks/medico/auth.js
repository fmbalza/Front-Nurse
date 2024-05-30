import { doLogin, doVerify, doRegister } from "../../api/medico/auth.js";
import useAuthStore from "../../storage/auth.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useNavigation } from "@react-navigation/native";

export const useMedicoLogin = () => {
  const login = useAuthStore((state) => state.login);
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => doLogin(data),
    onSuccess: (data) => {
      // console.log("aqui", data);
      login(data.jwt, jwtDecode(data.jwt));
      // navigation.navigate("HomeMedico"); //metodo por defecto
      queryClient.invalidateQueries("consultasDia")
      navigation.reset({
        index: 0,
        routes: [{ name: "HomeMedico" }],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useRegisterMedico = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return useMutation({
    mutationFn: (data) => doRegister(data),
    onSuccess: (data) => {
      console.log("aqui", data);
      // queryClient.invalidateQueries("paciente");
      if (data === "Medico creado exitosamente") {
        navigation.navigate("MedicoLogin");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useVerifyMedico = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["verifyMedico"],
    queryFn: () => doVerify(),
    // enabled: false,
  });
};
