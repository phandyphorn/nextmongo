// CustomerCardClient.tsx
"use client";
import { deleteCustomer, getCustomerById } from "@/actions/customerAction";
import { useState } from "react";
export interface CustomerInterface {
  _id: string;
  firstName: string;
  lastName: string;
  __v: number;
}

const CustomerCardClient = ({
  customers,
}: {
  customers?: CustomerInterface[];
}) => {
  const [customer, setCustomer] = useState({});
  const handleDelete = async (customerId: string) => {
    try {
      await deleteCustomer(customerId);
      alert(`Customer with id ${customerId} deleted`);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const handleGetById = async (customerId: string) => {
    try {
      const customerForUpdate = await getCustomerById(customerId);
      setCustomer(customer);
      alert(`Customer with id ${customerId} for update`);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
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
              <button onClick={() => handleGetById(customer._id)}>Edit</button>
              <button
                onClick={() => handleDelete(customer._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerCardClient;
