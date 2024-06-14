import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { APIEndpoint, Routes, TokenKey } from "../../constant";
import { axiosInstance } from "../../services/api-client";

export interface IRegisterPost {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

interface IRegisterResponse {
  token: string;
  message: string;
  access: string;
  user: {
    name: string;
    email: string;
  };
}

const useRegister = () => {
  return useMutation<IRegisterResponse, AxiosError, IRegisterPost>({
    mutationFn: (data: IRegisterPost) =>
      axiosInstance.post(APIEndpoint.REGISTER, data).then((res) => res.data),

    onSuccess: (res: IRegisterResponse) => {
      localStorage.setItem(TokenKey, res.token);
      toast.success(res.message || "Successfully Registered");

      if (res.token) window.location.href = `app/${Routes.DASHBOARD}`;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error(
        "Registration Error:",
        error.response?.data.message || error.message
      );
      toast.error(
        error.response?.data.message ||
          error.message ||
          "Registration failed, please try again."
      );
    },
    retry: 0,
  });
};

export default useRegister;
