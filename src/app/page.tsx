import CustomerCardServer from "@/components/customerCard/CustomerCardServer";
import CustomerFormServer from "@/components/customerForm/CustomerFormServer";

export default async function Home() {
  return (
    <>
      <CustomerFormServer />
      <CustomerCardServer />
    </>
  );
}
