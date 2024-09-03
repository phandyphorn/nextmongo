// import CustomerCardServer from "@/components/customerCard/CustomerCardServer";
// import CustomerFormClient from "@/components/customerForm/CustomerFormClient";

// export default async function Home() {
//   return (
//     <>
//       <CustomerFormClient />
//       <CustomerCardServer />
//     </>
//   );
// }

"use client";

import CustomerFormClient from "@/components/customerForm/CustomerFormClient";
import { useState, useEffect } from "react";
export interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  __v: number;
}

export default function Home() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    async function fetchCustomers() {
      let res = await fetch("http://localhost:3000/api/customers");
      let data = await res.json();
      setCustomers(data as Customer[]);
    }
    fetchCustomers();
  }, []);

  if (!customers) return <div>Loading...</div>;

  return (
    <>
   <CustomerFormClient />
    <div>
      {customers?.map((customer, index) => (
        <div
          key={index}
          className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4 mt-4"
        >
          <div className="p-4 flex justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {customer.firstName}
              </p>
              <p className="text-gray-700">{customer.lastName}</p>
            </div>
            <div className="flex gap-4">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
