interface dangerous_good_details {
  un_number: number | null;
  proper_shipping_name: string;
  class_division: string;
  subdivision: string;
  packaging_group: string;
  packaging_instructions: string;
  DangeriousQuantity: number | null;
  total_net_quantity: number | null;
  type_of_packing: string;
  authorization: string;
}

interface reefer_details {
  temperature: number | null;
  ventilation: number | null;
  humidity: number | null;
}

export interface container_details {
  dangerous_good_details: dangerous_good_details | null;
  reefer_details: reefer_details | null;
  description: string;
  container_type: string;
  quantity: string;
  weight_per_unit: string;
  hs_code: string;
  oversize: boolean;
  dangerous_goods: boolean;
  reefer: boolean;
  shipment: string;
  id: number;
}

export interface Cargo {
  container: container_details[];
  from: string;
  to: string;
  departureDate: Date | null;
  incoterm: string;
  deliveryAddress: string;
  pickupAddress: string;
  showPickupAddress: boolean;
  showDeliveryAddress: boolean;

  customer_reference: string;
}

interface Temperature_details {
  min: string;
  max: string;
}

export interface AirCargo {
  id: number;
  comiditydiscription: string;
  quantity: string;
  packages: string;
  weight: string;
  lcm: string;
  wcm: string;
  hcm: string;
  code_character: string;
  v_weight: string;
  tempearture: boolean;
  dangerous_good: boolean;
  temperature_details: Temperature_details;
  dangerous_good_details: dangerous_good_details;
  non_stackable: boolean | null;
}

export interface CargoFormProps {
  cargoState: AirCargo;
  handleCargoChange: (
    id: number,
    name: string,
    value: string | number | boolean | Date
  ) => void;
  handleCargoDelete: (id: number | string) => void;
  errors: any;
  index: number;
}
