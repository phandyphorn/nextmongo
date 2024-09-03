import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/db";
import mongoose from "mongoose";
import Student from "@/models/Student";

// Handle GET requests
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    // this teachers will be on the url
    const students = await Student.find({}).limit(10);
    //   .populate({ path: "subject", model: Subject }); // I use ref in teacher model.
    const res = NextResponse.json(students);
    return res;
  } catch (error) {
    console.error("Failed to fetch student:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { firstName, lastName, gender } = await request.json();

    const newStudent = new Student({
      firstName,
      lastName,
      gender,
    });
    if (!newStudent.firstName || !newStudent.lastName) {
      return NextResponse.json(
        { message: "First Name and Last Name are required" },
        { status: 400 }
      );
    }
    // Insert data into the collection
    const result = await Student.create(newStudent);
    GET(request);

    return NextResponse.json({
      message: "Student added",
      studentId: result.insertedId,
    });
  } catch (error) {
    console.error("Error inserting document:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    NextResponse.json(request);
  }
}
