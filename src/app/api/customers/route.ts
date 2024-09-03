import Customer from "@/models/Customer";
import { NextResponse } from "next/server";
import dbConnect from "../../lib/db";

// Handle GET requests
export async function GET(req: Request) {
  try {
    await dbConnect();
    // this customers will be on the url.
    const customers = await Customer.find().sort({ metacritic: -1 }).limit(10);
    const res = NextResponse.json(customers);
    return res;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    // Validate data if needed
    if (!data.firstName || !data.lastName) {
      return NextResponse.json(
        { message: "First Name and Last Name are required" },
        { status: 400 }
      );
    }
    // Insert data into the collection
    const result = await Customer.create(data);
    GET(request);

    return NextResponse.json({
      message: "Customer added",
      customerId: result.insertedId,
    });
  } catch (error) {
    console.error("Error inserting document:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { id, updateData } = await request.json();
  if (!id || !updateData) {
    return new Response("Invalid data", { status: 400 });
  }

  try {
    await dbConnect();

    const updatedCustomer = await Customer.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return new Response(JSON.stringify(updatedCustomer), { status: 200 });
  } catch (error) {
    return new Response("Error updating customer", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  if (!id) {
    return new Response("Invalid data", { status: 400 });
  }

  try {
    await dbConnect();
    const updatedCustomer = await Customer.findByIdAndDelete(id);
    return new Response(JSON.stringify(updatedCustomer), { status: 200 });
  } catch (error) {
    return new Response("Error delete customer", { status: 500 });
  }
}
