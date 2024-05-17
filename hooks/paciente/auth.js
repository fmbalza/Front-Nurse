import { doLogin } from "../../api/paciente/auth.js";
import useAuthStore from "../../storage/auth.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

export const usePacienteLogin = () => {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (data) => doLogin(data),
    // onSuccess: (data) => {
    //   login(data.token, jwtDecode(data.token));
    // },
  });
};

export const useVerifyPaciente = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["verifyPaciente"],
    queryFn: () => {
      return token;
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
};
