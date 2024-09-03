// CustomerCardServer.tsx
"use server";

import { getCustomers } from "@/actions/customerAction";
import CustomerCardClient, { Customer } from "./CustomerCardClient";

const CustomerCardServer = async () => {
  const customers = (await getCustomers()) as Customer[];

  return <CustomerCardClient customers={customers} />;
};

export default CustomerCardServer;
