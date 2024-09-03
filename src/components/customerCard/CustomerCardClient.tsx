// CustomerCardClient.tsx
"use client";
import { deleteCustomer, updateCustomer } from "@/actions/customerAction";
export interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
}

const CustomerCardClient = ({ customers }: { customers: Customer[] }) => {
  const handleEdit = async (customer: Customer) => {
    try {
      if (!customer._id) return;
      await updateCustomer(customer);
    } catch (err) {
      console.log(err);
    }
    alert(`Click to edit ${customer._id}`);
  };

  const handleDelete = async (customerId: string) => {
    try {
      await deleteCustomer(customerId);
      alert(`Customer with id ${customerId} deleted`);
    } catch (err) {
      console.log(err);
    }

    // Optionally, trigger a re-fetch or update the UI here
  };

  return (
    <div>
      {customers.map((customer, index) => (
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
              <button onClick={() => handleEdit(customer)}>Edit</button>
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
