export const divisionList = [
  { label: "N/A", value: "N/A" },
  {
    label: "1.4 Substances and Articles which present no significant hazard",
    value: "1.4",
  },
  {
    label: "2.1 Flammable Gases",
    value: "2.1",
  },
  {
    label: "2.2 Non-flammable Non-Toxic Gas",
    value: "2.2",
  },
  {
    label: "3 Flammable Liquids",
    value: "3",
  },
  {
    label: "4.1 Flammable Solids",
    value: "4.1",
  },
  {
    label: "4.2 Spontaneous Combustibles",
    value: "4.2",
  },
  {
    label: "4.3 Dangerous when wet",
    value: "4.3",
  },
  {
    label: "5.1 Oxidizing Agents",
    value: "5.1",
  },
  {
    label: "5.2 Organic Peroxides",
    value: "5.2",
  },
  {
    label: "6.1 Toxic Substances",
    value: "6.1",
  },
  {
    label: "8 Corrosive Substances",
    value: "8",
  },
  {
    label: "9 Miscellaneous Dangerous Goods",
    value: "9",
  },
];
import airNowSvg from "../assets/air-now.svg";
import premiumSvg from "../assets/air-premium.svg";
import airValueSvg from "../assets/air-value.svg";
export const servicesLevel = [
  {
    icon: airValueSvg,
    title: "Air Value",
    desc: "Our  regular cost-effective air freight service for when you have a little more time - 96 hours+",
    value: "air-value",
  },
  {
    icon: premiumSvg,
    title: "Air Premium",
    desc: "Our regular air freight service for  when you have a little more time in 48-96 hours",
    value: "air-premium",
  },
  {
    icon: airNowSvg,
    title: "Air now",
    desc: " Our Super-fast pick up and transit times  when you have a little more time in - 24-48 hours",
    value: "air-now",
  },
];

export const typeChoices = [
  { label: "BAG(S)", value: "BAG" },
  { label: "BALE(S)", value: "BLS" },
  { label: "BUNDLE(S)", value: "BDL" },
  { label: "BOTTLE(S)", value: "BOT" },
  { label: "BOX(ES)", value: "BOX" },
  { label: "BASKET OR HAMPER", value: "BSK" },
  { label: "CASE(S)", value: "CAS" },
  { label: "COIL(S)", value: "COL" },
  { label: "CRATE(S)", value: "CRT" },
  { label: "CARTON(S)", value: "CTN" },
  { label: "CYLINDER(S)", value: "CYL" },
  { label: "DRUM(S)", value: "DRM" },
  { label: "ENVELOPE(S)", value: "ENV" },
  { label: "KEG(S)", value: "KEG" },
  { label: "PAIL(S)", value: "PAL" },
  { label: "PIECE(S)", value: "PCS" },
  { label: "PACKAGE(S)", value: "PKG" },
  { label: "PALLET(S)", value: "PLT" },
  { label: "REEL(S)", value: "REL" },
  { label: "ROLL(S)", value: "ROL" },
  { label: "SHEET(S)", value: "SHT" },
  { label: "SKID(S)", value: "SKD" },
  { label: "STACKABLE PALLETS", value: "SPL" },
  { label: "TOTES", value: "TOT" },
  { label: "TUB(S)", value: "TUB" },
  { label: "UNIT(S)", value: "UNT" },
];

export const currencyChoices = [
  { label: "USD", value: "USD" },
  { label: "EUR", value: "EUR" },
  { label: "JPY", value: "JPY" },
  { label: "GBP", value: "GBP" },
  { label: "AUD", value: "AUD" },
  { label: "CAD", value: "CAD" },
  { label: "CHF", value: "CHF" },
  { label: "CNY", value: "CNY" },
  { label: "HKD", value: "HKD" },
  { label: "NZD", value: "NZD" },
  { label: "SEK", value: "SEK" },
  { label: "KRW", value: "KRW" },
  { label: "SGD", value: "SGD" },
  { label: "NOK", value: "NOK" },
  { label: "MXN", value: "MXN" },
  { label: "INR", value: "INR" },
  { label: "RUB", value: "RUB" },
  { label: "ZAR", value: "ZAR" },
  { label: "TRY", value: "TRY" },
  { label: "BRL", value: "BRL" },
  { label: "TWD", value: "TWD" },
  { label: "DKK", value: "DKK" },
  { label: "PLN", value: "PLN" },
  { label: "THB", value: "THB" },
  { label: "IDR", value: "IDR" },
  { label: "HUF", value: "HUF" },
  { label: "CZK", value: "CZK" },
  { label: "ILS", value: "ILS" },
  { label: "CLP", value: "CLP" },
  { label: "PHP", value: "PHP" },
  { label: "AED", value: "AED" },
  { label: "COP", value: "COP" },
  { label: "SAR", value: "SAR" },
  { label: "MYR", value: "MYR" },
  { label: "RON", value: "RON" },
];
export const incotermList = [
  ["EXW", "EXW - Ex Works"],
  ["FCA", "FCA - Free Carrier"],
  ["FOB", "FOB - Free On Board"],
  ["CPT", "CPT - Carriage Paid To"],
  ["CFR", "CFR - Cost and Freight"],
  ["CIF", "CIF - Cost, Insurance and Freight"],
  ["CIP", "CIP - Carriage and Insurance Paid To"],
  ["DAP", "DAP - Delivered At Place"],
  ["DDP", "DDP - Delivered Duty Paid"],
].map(([value, label]) => ({ label, value }));
