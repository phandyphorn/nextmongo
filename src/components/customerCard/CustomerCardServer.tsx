// CustomerCardServer.tsx
"use server";

import { getCustomers } from "@/actions/customerAction";
import CustomerCardClient, { CustomerInterface } from "./CustomerCardClient";

const CustomerCardServer = async () => {
  const customers = (await getCustomers()) as CustomerInterface[];

  return <CustomerCardClient customers={customers} />;
};

export default CustomerCardServer;
