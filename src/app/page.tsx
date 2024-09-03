import CustomerCardServer from "@/components/customerCard/CustomerCardServer";
import CustomerFormClient from "@/components/customerForm/CustomerFormClient";

export default async function Home() {
  return (
    <>
      <CustomerFormClient />
      <CustomerCardServer />
    </>
  );
}
