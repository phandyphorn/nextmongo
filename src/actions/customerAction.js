"use server";

import Customer from "@/models/Customer";

const addCustomer = async (customer) => {
  try {
    if (!customer && (!firstName === "" || !lastName)) return;
    return await new Customer(customer).save();
  } catch (err) {
    console.log("error: ", err);
  }
};

const updateCustomer = async (customer) => {
  try {
    return Customer.updateOne(
      { _id: customer._id },
      {
        $set: {
          firstName: customer.firstName,
          lastName: customer.lastName,
        },
        $currentDate: { lastUpdated: true },
      }
    );
  } catch (err) {
    console.log("error: ", err);
  }
};

const deleteCustomer = async (customerId) => {
  try {
    if (!customerId) return;
    return Customer.deleteOne({ _id: customerId });
  } catch (err) {
    console.log("error: ", err);
  }
};

const getCustomers = async () => {
  return Customer.find();
};

const getCustomerById = async (customerId) => {
  return Customer.findById({ _id: customerId });
};

export {
  addCustomer,
  getCustomers,
  deleteCustomer,
  updateCustomer,
  getCustomerById,
};
