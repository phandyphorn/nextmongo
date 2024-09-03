import Subject from "@/models/Subject";
import { NextResponse } from "next/server";
import dbConnect from "../../lib/db";

// Handle GET requests
export async function GET(req: Request) {
  try {
    await dbConnect();
    // this teachers will be on the url.
    const subjects = await Subject.find().sort({ metacritic: -1 }).limit(10);
    const res = NextResponse.json(subjects);
    return res;
  } catch (error) {
    console.error("Failed to fetch subject:", error);
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: 500 }
    );
  }
}
