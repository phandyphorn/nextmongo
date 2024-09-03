// CustomerFormServer.tsx
"use server";

import { addCustomer } from "@/actions/customerAction";
import CustomerFormClient from "./CustomerFormClient";

const CustomerFormServer = async () => {
  return <CustomerFormClient addCustomer={addCustomer} />;
};

export default CustomerFormServer;
