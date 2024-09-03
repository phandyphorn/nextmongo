import Teacher from "@/models/Teacher";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../lib/db";
import mongoose from "mongoose";
import Subject from "@/models/Subject";

// Handle GET requests
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    // this teachers will be on the url
    const teachers = await Teacher.find({})
      .limit(10)
      .populate({ path: "subject", model: Subject }); // I use ref in teacher model.
    const res = NextResponse.json(teachers);
    return res;
  } catch (error) {
    console.error("Failed to fetch teacher:", error);
    return NextResponse.json(
      { error: "Failed to fetch teachers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    // const data = await request.json();
    // Validate data if needed
    const { firstName, lastName, gender, phoneNumber, subject } =
      await request.json();
    const subjectId = new mongoose.Types.ObjectId(String(subject)); // I get

    const newTeacher = new Teacher({
      firstName,
      lastName,
      gender,
      phoneNumber,
      subject: subjectId, // Store ObjectId for relations
    });
    if (!newTeacher.firstName || !newTeacher.lastName) {
      return NextResponse.json(
        { message: "First Name and Last Name are required" },
        { status: 400 }
      );
    }
    // Insert data into the collection
    const result = await Teacher.create(newTeacher);
    GET(request);

    return NextResponse.json({
      message: "Teacher added",
      teacherId: result.insertedId,
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

export async function PUT(request: NextRequest) {
  const { id, updateData } = await request.json();
  if (!id || !updateData) {
    return new Response("Invalid data", { status: 400 });
  }

  try {
    await dbConnect();

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return new Response(JSON.stringify(updatedTeacher), { status: 200 });
  } catch (error) {
    return new Response("Error updating teacher", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  if (!id) {
    return new Response("Invalid data", { status: 400 });
  }

  try {
    await dbConnect();
    const deleteTeacher = await Teacher.findByIdAndDelete(id);
    return new Response(JSON.stringify(deleteTeacher), { status: 200 });
  } catch (error) {
    return new Response("Error delete teacher", { status: 500 });
  }
}
