import { APIEndpoint } from "../constant";
import APIClient from "../services/api-client";

interface Cargo {
  id: number;
  dangerous_good_details: any | null;
  reefer_details: any | null;
  weight_length_unit: string;
  temperature_unit: string;
  description: string;
  container_type: string;
  item_type: string;
  quantity: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  hs_code: string;
  oversize: any | null;
  non_stackable: boolean;
  dangerous_goods: boolean;
  reefer: boolean;
  shipment: number;
}

interface Shipment {
  id: number;
  cargo: Cargo[];
  type: string;
  transport_mode: string;
  departure_date: string;
  incoterm: string;
  pickup_service: boolean;
  delivery_service: boolean;
  pickup_address: any | null;
  delivery_address: any | null;
  estimated_cost: any | null;
  insurance_needed: any | null;
  insurance_value: any | null;
  insurance_currency: any | null;
  notes: any | null;
  files: any | null;
  customer_reference: string;
  user: number;
  from_location: number;
  to_location: number;
  service_level: any | null;
}
const apiClient = new APIClient();

export const useRequestList = () =>
  apiClient.getAll<Shipment[]>(APIEndpoint.SHIPMENT_LIST, true);
