import Customer from "@/models/Customer";
import dbConnect from "../../lib/db";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// Handle GET requests
export async function GET(req: Request) {
  try {
    await dbConnect();

    // this customers will be on the url.
    const customers = await Customer.find({})
      .sort({ metacritic: -1 })
      .limit(10);
    const res = NextResponse.json(customers);

    // Set CORS headers
    res.headers.set(
      "Access-Control-Allow-Origin",
      "https://vercel.com/phandyphorns-projects-9bdc8697/schs/71Toa1tiGjn9bop3aVxRhPDkaLyG"
    ); // Allow from any origin
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allowed HTTP methods
    res.headers.set("Access-Control-Allow-Headers", "Content-Type"); // Allowed headers

    return res;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}
