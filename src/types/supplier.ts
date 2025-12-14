export interface ISupplier {
  id: string;
  _id: string; // some APIs return both
  name: string;
  email: string;
  phone: string;
  address: string;
  type: "INDIVIDUAL" | "BUSINESS" | string; // extend with more types if needed
  contact_id: number;
  default_payment_terms: string; // e.g. "CASH ON DELIVERY"
  tax_info: string; // e.g. NID, VAT, BIN
  notes: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export const SUPPLIER_TYPE_OPTIONS = ["INDIVIDUAL", "BUSINESS"];

export type TSupplier = {
 _id: string;
 id: string;
 name: string;
 email: string;
 phone: string;
 address: string;
 createdAt: string;
 updatedAt: string;
};
