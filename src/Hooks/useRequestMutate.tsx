import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { axiosInstance } from "../services/api-client";

export interface ICargoDetailsPost {
  cargo: {
    dangerous_good_details: {
      un_number: string;
      proper_shipping_name: string;
      class_division: number | null;
      subdivision: string;
      packaging_group: number | null;
      packaging_instructions: string;
      quantity: number | null;
      total_net_quantity: string;
      type_of_packing: string;
      authorization: string;
    };
    reefer_details: {
      temperature: number | null;
      ventilation: number | null;
      humidity: number | null;
    };
    description: string;
    container_type: string | null;
    quantity: string;
    weight_per_unit: string;
    hs_code: string;
    oversize: boolean;
    dangerous_goods: boolean;
    reefer: boolean;
  };
  type: string | null;
  transport_mode: string | null;
  departure_date: string | null;
  incoterm: string | null;
  customer_reference: string;
  pickup_service: boolean;
  delivery_service: boolean;
  pickup_address: string;
  delivery_address: string;
  estimated_cost: number | null;
  from_location: string | null;
  to_location: string | null;
}

interface IResponse {
  message: string;
}

const useRequestMutate = () => {
  return useMutation<IResponse, AxiosError, ICargoDetailsPost>({
    mutationFn: (data) =>
      axiosInstance.post("shipment/", data).then((res) => res.data),

    onSuccess: (res) => {
      toast.success(res.message || "Successfully Registered");
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

export default useRequestMutate;
