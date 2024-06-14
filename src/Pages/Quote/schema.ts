import { Schema } from "rsuite";
import { z } from "zod";
// to_location: z.number().nullable().optional(),
const { StringType, NumberType } = Schema.Types;

// const schema = z.object({
//   pickupAddress: z.string().optional(),
//   to: z.number().min(1, { message: "To is required" }),
//   from: z.number().min(1, { message: "From is required" }),
//   deliveryAddress: z.string().optional(),
//   departureDate: z.date({ message: "Departure date is required" }),
//   incoterm: z.string().min(1, { message: "Incoterm is required" }),
//   description: z.string().min(1, { message: "Description is required" }),
//   container_type: z.string().min(1, { message: "Container type is required" }),
//   quantity: z.string().min(1, { message: "Quantity is required" }),
//   weight_per_unit: z
//     .string()
//     .min(1, { message: "Weight per unit is required" }),
//   hs_code: z.string().min(1, { message: "HS code is required" }),
//   oversize: z.boolean({ required_error: "Oversize is required" }),
//   dangerous_goods: z.boolean({ required_error: "Dangerous goods is required" }),
//   reefer: z.boolean({ required_error: "Reefer is required" }),
//   un_number: z.string().min(1, { message: "UN number is required" }).optional(),
//   proper_shipping_name: z
//     .string()
//     .min(1, { message: "Proper shipping name is required" })
//     .optional(),
//   class_division: z
//     .string()
//     .min(1, { message: "Class division is required" })
//     .optional(),
//   subdivision: z
//     .string()
//     .min(1, { message: "Subdivision is required" })
//     .optional(),
//   DangeriousQuantity: z
//     .string()
//     .min(1, { message: "Quantity is required" })
//     .optional(),
//   packaging_group: z
//     .string()
//     .min(1, { message: "Packaging group is required" })
//     .optional(),
//   packaging_instructions: z
//     .string()
//     .min(1, { message: "Packaging instructions is required" })
//     .optional(),
//   total_net_quantity: z
//     .string()
//     .min(1, { message: "Total net quantity is required" })
//     .optional(),
//   type_of_packing: z
//     .string()
//     .min(1, { message: "Type of packing is required" })
//     .optional(),
//   authorization: z
//     .string()
//     .min(1, { message: "Authorization is required" })
//     .optional(),
//   temperature: z
//     .string()
//     .min(1, { message: "Temperature is required" })
//     .optional(),
//   ventilation: z
//     .string()
//     .min(1, { message: "Ventilation is required" })
//     .optional(),
//   humidity: z.string().min(1, { message: "Humidity is required" }).optional(),
//   customer_reference: z
//     .string()
//     .min(1, { message: "Customer reference is required" })
//     .optional(),
//   pickup_service: z.boolean({ required_error: "Pickup service is required" }),
//   delivery_service: z.boolean({
//     required_error: "Delivery service is required",
//   }),
//   estimated_cost: z.number({ required_error: "Estimated cost is required" }),
//   dangerous_good_details: z
//     .string()
//     .min(1, { message: "dangerous_good_details is required" }),

// });

const dangerousGoodDetailsSchema = z.object({
  un_number: z.string().nullable(),
  proper_shipping_name: z.string().min(1, { message: "Proper shipping name is required" }).nullable(),
  class_division: z.string().min(1, { message: "Class division is required" }).nullable(),
  subdivision: z.string().min(1, { message: "Subdivision is required" }).nullable(),
  packaging_group: z.string().min(1, { message: "Packaging group is required" }).nullable(),
  packaging_instructions: z.string().min(1, { message: "Packaging instructions is required" }).nullable(),
  DangeriousQuantity: z.string().min(1, { message: "Quantity is required" }).nullable(),
  total_net_quantity: z.string().min(1, { message: "Total net quantity is required" }).nullable(),
  type_of_packing: z.string().min(1, { message: "Type of packing is required" }).nullable(),
  authorization: z.string().min(1, { message: "Authorization is required" }).nullable(),
});

const reeferDetailsSchema = z.object({
  temperature: z.string().min(1, { message: "Temperature is required" }).nullable(),
  ventilation: z.string().min(1, { message: "Ventilation is required" }).nullable(),
  humidity: z.string().min(1, { message: "Humidity is required" }).nullable(),
});

const containerSchema = z.object({
  dangerous_good_details: dangerousGoodDetailsSchema.optional().nullable(),
  reefer_details: reeferDetailsSchema.optional().nullable(),
  description: z.string().min(1, { message: "Description is required" }).nullable(),
  container_type: z.string().min(1, { message: "Container type is required" }).nullable(),
  quantity: z.string().min(1, { message: "Quantity is required" }).nullable(),
  weight_per_unit: z.string().min(1, { message: "Weight per unit is required" }).nullable(),
  hs_code: z.string().min(1, { message: "HS code is required" }).nullable(),
  oversize: z.boolean({ required_error: "Oversize is required" }),
  dangerous_goods: z.boolean({ required_error: "Dangerous goods is required" }),
  reefer: z.boolean({ required_error: "Reefer is required" }),
  shipment: z.string().nullable(),
  id: z.number(),
});


const schema = z.object({
  pickupAddress: z.string().optional(),
  to: z.string().min(1, { message: "To is required" }),
  from: z.string().min(1, { message: "From is required" }),
  deliveryAddress: z.string().optional(),
  departureDate: z.date({ message: "Departure date is required" }).nullable(),
  incoterm: z.string().min(1, { message: "Incoterm is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  container: z.array(containerSchema),
  customer_reference: z.string().min(1, { message: "Customer reference is required" }),
  pickup_service: z.boolean({ required_error: "Pickup service is required" }),
  delivery_service: z.boolean({ required_error: "Delivery service is required" }),
  estimated_cost: z.number({ required_error: "Estimated cost is required" }),
});

export default schema;
export const serviceModel = Schema.Model({
  from_location: StringType().isRequired("From Location is required."),
  to_location: StringType().isRequired("To Location is required."),
  selectdate: StringType().isRequired("date is required."),
  incoterm: StringType().isRequired("incoterm is required."),
  comiditydiscription: StringType().isRequired("comidity is required."),
  class_division: StringType().isRequired("class_division is required."),
  quantity: NumberType().isRequired("Quantity is required."), 
  packages: StringType().isRequired("Package is required."),
  weight: StringType().isRequired("weight is required."),
  lcm: StringType().isRequired("lcm is required."),
  wcm: StringType().isRequired("wcm is required."),
  hcm: StringType().isRequired("hcm is required."),
  v_weight: StringType().isRequired("volumetric weight  is required."),
  code_character: StringType().isRequired("code character  is required."),
  customer_reference: StringType().isRequired(
    "customer reference  is required."
  ),
  comment: StringType().isRequired("comment  is required."),
  file: StringType().isRequired("file  is required."),
  un_number: StringType().isRequired("Un Number  is required."),
  proper_shipping_name: StringType().isRequired("Shipping Name  is required."),
  subdivision: StringType().isRequired("Subdivision  is required."),
  packageinstruction: StringType().isRequired("Package  is required."),
  DangeriousQuantity: StringType().isRequired("quantity  is required."),
  totalquantity: StringType().isRequired("Total Quantity  is required."),
  packing_type: StringType().isRequired("Packing Type   is required."),
  authorizing: StringType().isRequired("Authorizing Type   is required."),
  temperature_min: StringType().isRequired("Temperature Min    is required."),
  temperature_max: StringType().isRequired("Temperature Max    is required."),
});