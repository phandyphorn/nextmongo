"use client";
<<<<<<< HEAD
import { useState } from "react";
import { Customer } from "../customerCard/CustomerCardClient";

const CustomerFormClient = ({
=======
import { useEffect, useState } from "react";
import {
>>>>>>> 9fc6416 (develop crud)
  addCustomer,
  getCustomerById,
  updateCustomer,
} from "@/actions/customerAction";
import { CustomerInterface } from "../customerCard/CustomerCardClient";

const CustomerFormClient = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async () => {
    try {
      if (!firstName || !lastName) return;
      return addCustomer({ firstName: firstName, lastName: lastName });
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const handleEdit = async (customer: CustomerInterface) => {
    try {
      if (!customer._id) return;
      await updateCustomer(customer);
    } catch (err) {
      console.log("error: ", err);
    }
    alert(`Click to edit ${customer._id}`);
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
            placeholder="Input First Name"
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
            placeholder="Input Last Name"
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
