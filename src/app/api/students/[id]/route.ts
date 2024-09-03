import { NextRequest, NextResponse } from "next/server";
import Student from "@/models/Student";
import dbConnect from "@/app/lib/db";

// Handle GET requests
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await dbConnect();
    // this teachers will be on the url
    const student = await Student.findById(id);

    if (!student) {
      return NextResponse.json(
        { message: "Get student by id not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(student);
  } catch (error) {
    console.error("Failed to fetch student:", error);
    return NextResponse.json(
      { error: "Failed to fetch a student student" },
      { status: 500 }
    );
  }
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();

  try {
    await dbConnect();

    const updatedStudent = await Student.findByIdAndUpdate(id, body, { new: true });

    if (!updatedStudent) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json(updatedStudent);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating student' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await dbConnect();
    
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Student deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting student' }, { status: 500 });
  }
}