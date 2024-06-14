import APIClient from "../services/api-client";

interface ILocation {
  id: string;
  name: string;
  port_type: string;
  country: string;
  location: string;
}
const apiCLient = new APIClient();

export const useLocations = () =>
  apiCLient.getAll<ILocation[]>(`quote/locations/`, true);
