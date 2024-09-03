"use client";
import { Customer } from "@/app/page";
import { baseUrl } from "@/config";
import { useState, useEffect } from "react";

function UpdateCustomerForm({ customer }: { customer: Customer }) {
  const [firstName, setFirstName] = useState(customer.firstName);
  const [lastName, setLastName] = useState(customer.lastName);

  useEffect(() => {
    setFirstName(customer.firstName);
    setLastName(customer.lastName);
  }, [customer]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-4 p-6 bg-white shadow-lg rounded-lg space-y-4"
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
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Add Customer
      </button>
    </form>
  );
}

export default UpdateCustomerForm;
