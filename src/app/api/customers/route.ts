import Customer from "@/models/Customer";
import dbConnect from "../../lib/db";
import { NextResponse } from "next/server";

// Handle GET requests
export async function GET() {
  let client;
  try {
    await dbConnect();

    // this customers will be on the url.
    const customers = await Customer.find({})
      .sort({ metacritic: -1 })
      .limit(10);
    return NextResponse.json(customers);
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
