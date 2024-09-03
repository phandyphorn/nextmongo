// components/CustomerForm.tsx
"use client";

import { Customer } from "@/app/page";
import { baseUrl } from "@/config";
import { useEffect, useState } from "react";

const CustomerForm = ({
  customer,
  setIsOpen,
}: {
  customer: Customer;
  setIsOpen: (value: boolean) => void;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    setFirstName(customer.firstName);
    setLastName(customer.lastName);
  }, [customer]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (customer?._id) {
        try {
          const response = await fetch(baseUrl, {
            method: "PUT",
            body: JSON.stringify({
              id: customer._id,
              updateData: { firstName: firstName, lastName: lastName },
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to update customer");
          }

          const result = await response.json();

          console.log(result);
        } catch (err) {
          console.log(err);
        }
      }
      const response = await fetch(baseUrl, {
        method: "POST",
        body: JSON.stringify({ firstName, lastName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setFirstName("");
      setLastName("");
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="max-w-screen-lg">
        <form
          onSubmit={handleSubmit}
          className="max-w-screen-lg mx-auto mt-4 p-6 bg-white shadow-lg rounded-lg space-y-4"
        >
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="p-4 md:p-5 text-center">
            <button
              onClick={() => setIsOpen(false)}
              data-modal-hide="popup-modal"
              type="button"
              className="text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Cancel
            </button>
            <button
              data-modal-hide="popup-modal"
              type="submit"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-blue-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {customer?._id ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
