// CustomerCardClient.tsx
"use client";


import { useState } from "react";
import CustomerForm from "./CustomerForm";
import { Customer } from "../../app/page";
import { baseUrl } from "@/config";
export interface CustomerInterface {
  _id: string;
  firstName: string;
  lastName: string;
  __v: number;
}

const CustomerList = ({ customers }: { customers?: CustomerInterface[] }) => {
  const [customer, setCustomer] = useState<Customer>();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(baseUrl, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
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
                <button
                  onClick={() => {
                    setCustomer(customer);
                    setIsOpen(true);
                  }}
                >
                  Edit
                </button>
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

      {isOpen && (
        <CustomerForm customer={customer as Customer} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default CustomerList;
