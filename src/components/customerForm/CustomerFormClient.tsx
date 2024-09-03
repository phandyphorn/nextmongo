"use client";

import { useState } from "react";
import { Customer } from "../customerCard/CustomerCardClient";

const CustomerFormClient = ({
  addCustomer,
}: {
  addCustomer: (customer: Omit<Customer, "_id">) => void;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async () => {
    try {
      if (!firstName && !lastName) return;
      const customer = { firstName: firstName, lastName: lastName };
      addCustomer(customer);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form
        action={handleSubmit}
        className="max-w-md mx-auto p-4 mt-8 bg-white shadow-md rounded-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            name="firstName"
            type="text"
            id="firstName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Last Name
          </label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            name="lastName"
            type="text"
            id="lastName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Add Customer
        </button>
      </form>
    </>
  );
};

export default CustomerFormClient;
