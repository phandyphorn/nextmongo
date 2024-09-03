// CustomerCardServer.tsx
"use server";

// import { getCustomers } from "@/actions/customerAction";
import CustomerCardClient, { CustomerInterface } from "./CustomerCardClient";

const CustomerCardServer = async () => {
  // const customers = (await getCustomers()) as CustomerInterface[];

  // return <CustomerCardClient customers={customers} />;
  return (
    <p className="text-center pt-4">
      Here is customer list, now cannot got them yet
    </p>
  );
};

export default CustomerCardServer;
