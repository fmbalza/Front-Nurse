import {
  doLogin,
  doVerify,
  doRegister,
  getMe,
  doUpdate,
  requestCertificado,
} from "../../api/medico/auth.js";
import useAuthStore from "../../storage/auth.js";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useNavigation } from "@react-navigation/native";

export const useMedicoLogin = () => {
  const login = useAuthStore((state) => state.login);
  const setRole = useAuthStore((state) => state.setRole);
  const setCertified = useAuthStore((state) => state.setCertified);
  const setPushToken = useAuthStore((state) => state.setPushToken);
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => doLogin(data),
    onSuccess: (data) => {
      const user = jwtDecode(data.jwt);
      login(data.jwt, user);
      setRole("medico");
      setCertified(data.certificado);
      setPushToken(user.push_token);
      // navigation.navigate("HomeMedico"); //metodo por defecto
      queryClient.invalidateQueries("consultasDia");
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
      console.log("Aqui en auth.js: ", data);
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
  const role = useAuthStore((state) => state.role);
  const rememberMe = useAuthStore((state) => state.rememberMe);

  return useQuery({
    queryKey: ["verifyMedico"],
    queryFn: () => doVerify(),
    enabled: rememberMe && role === "medico",
  });
};

export const useRequestCertificado = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const id = useAuthStore((state) => state.user?.cedula_medico);

  return useMutation({
    mutationFn: (data) => requestCertificado(id, data),
    onSuccess: (data) => {
      console.log("Aqui en auth.js: ", data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["getMeMedico"],
    queryFn: () => getMe(),
    // staleTime: 5000,
  });
};

export const useUpdateMedico = () => {
  const login = useAuthStore((state) => state.login);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => doUpdate(data),
    onSuccess: (data) => {
      // console.log("aqui", data);
      const user = jwtDecode(data.jwt);
      login(data.jwt, user);
      if (data.msg === "Medico actualizado exitosamente") {
        console.log("Los datos se cambiaron exitosamente");
        queryClient.invalidateQueries("getMeMedico");
      } else {
        console.error("Error: ", data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
