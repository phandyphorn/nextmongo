"use client";

import { useState } from "react";
import StudentForm from "./StudentForm";
import { StudentListing } from "@/types/studentType";
import useQueryStudent from "@/hooks/useQueryStudent";
import useMutationDeleteStudent from "@/hooks/useMutationDeleteStudent";

const StudentList = ({
  students,
  fetchStudents,
}: {
  students?: StudentListing[];
  fetchStudents: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {mutateAsync: deleteStudent} = useMutationDeleteStudent()
  const [id, setId] = useState<string>("");

  const handleEdit = (id: string) => {
    setId(id);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <div>
        {students?.map((student, index) => (
          <div
            key={index}
            className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4 mt-4"
          >
            <div className="p-4 flex justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {student.firstName}
                </p>
                <p className="text-gray-700">{student.lastName}</p>
              </div>
              <div className="flex gap-4">
                <button onClick={() => handleEdit(student._id)}>Edit</button>
                <button
                  onClick={() => handleDelete(student._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isOpen && (
        <StudentForm
          fetchStudents={fetchStudents}
          id={id}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

export default StudentList;
