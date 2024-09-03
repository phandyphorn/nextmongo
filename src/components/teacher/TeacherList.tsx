"use client";

import { useState } from "react";
import { baseUrlTeacher } from "@/config";
import TeacherForm from "./TeacherForm";
import { TeacherListing, TeacherRequest } from "@/types/teacherType";

const TeacherList = ({
  teachers,
  fetchTeachers,
}: {
  teachers?: TeacherListing[];
  fetchTeachers: () => void;
}) => {
  const [teacher, setTeacher] = useState<TeacherRequest>();
  const [isOpen, setIsOpen] = useState(false);

  const getTeacher = (teacher: TeacherListing) => {
    const { _id, firstName, lastName, gender, phoneNumber, subject } = teacher;
    const teacherResult = {
      _id,
      firstName,
      lastName,
      gender,
      phoneNumber,
      subject: subject._id,
    };
    setTeacher(teacherResult);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(baseUrlTeacher, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
      });
      fetchTeachers();
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <div>
        {teachers?.map((teacher, index) => (
          <div
            key={index}
            className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4 mt-4"
          >
            <div className="p-4 flex justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {teacher.firstName}
                </p>
                <p className="text-gray-700">{teacher.lastName}</p>
                <p className="text-gray-700">{teacher.subject.name}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    getTeacher(teacher);
                    setIsOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(teacher._id)}
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
        <TeacherForm
          fetchTeachers={fetchTeachers}
          teacher={teacher as TeacherRequest}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};

export default TeacherList;
