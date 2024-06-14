import APIClient from "../services/api-client";

interface IReuest {
  id: number;
  type: "EXPORT" | "IMPORT";
  transport_mode: "FCL";
  from_location: number;
  to_location: number;
  departure_date: string;
  incoterm: SVGAnimatedString;
  customer_reference: "sm68";
  pickup_service: boolean;
  delivery_service: boolean;
  pickup_address?: string | null;
  delivery_address: string;
  estimated_cost?: null | string;
}
const apiClient = new APIClient();

export const useRequestList = () =>
  apiClient.getAll<IReuest[]>(`quote/shipments/`, true);
