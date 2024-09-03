"use client";

import React, { useEffect, useState } from "react";
import { Customer } from "../page";
import CustomerForm from "../../components/customer/CustomerForm";
import CustomerList from "../../components/customer/CustomerList";
import { baseUrl } from "@/config";

const CustomerPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const customer = {
    _id: "",
    firstName: "",
    lastName: "",
    __v: 0,
  };

  useEffect(() => {
    async function fetchCustomers() {
      let res = await fetch(baseUrl);
      let data = await res.json();
      setCustomers(data as Customer[]);
    }
    fetchCustomers();
  }, []);
  return (
    <div className="max-w-screen-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4 mt-4">
      <div className="text-center font-bold p-4">Customer Page</div>
      <div className="flex items-end justify-end pr-16">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create +
        </button>

        {isOpen && <CustomerForm customer={customer} setIsOpen={setIsOpen} />}
      </div>
      <CustomerList customers={customers} />
    </div>
  );
};

export default CustomerPage;
