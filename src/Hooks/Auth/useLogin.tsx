import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Routes, TokenKey } from "../../constant";
import { axiosInstance } from "../../services/api-client";

export interface ILoginPost {
  email: string;
  password: string;
}

interface ILoginResponse {
  token: string;
  message: string;
  access: string;
  redirect: string;
  user: {
    name: string;
    email: string;
  };
}
const useLogin = () => {
  return useMutation<ILoginResponse, AxiosError, ILoginPost>({
    mutationFn: (data: ILoginPost) =>
      axiosInstance.post("api/login/", data).then((res) => res.data),

    onSuccess: (res: ILoginResponse) => {
      console.log(res);
      localStorage.setItem(TokenKey, res.token);

      toast.success(res.message || "Successfully Login");
      if (res.token) window.location.href = `app/${Routes.DASHBOARD}`;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error.message);
      toast.error(
        (error.response?.data.message as string) ||
          error.message ||
          "Login Failed."
      );
    },
    retry: 0,
  });
};

export default useLogin;
