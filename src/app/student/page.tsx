"use client";

import React, { useEffect, useState } from "react";
import { baseUrlTeacher } from "@/config";
import { TeacherListing } from "@/types/teacherType";
import StudentForm from "@/components/student/StudentForm";
import StudentList from "@/components/student/StudentList";
import { StudentListing } from "@/types/studentType";
import useQueryStudents from "@/hooks/useQueryStudents";

const StudentPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const student = {
    _id: "",
    firstName: "",
    lastName: "",
    gender: "",
  };

  const { students, refetch } = useQueryStudents();

  return (
    <div className="max-w-screen-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4 mt-4">
      <div className="text-center font-bold p-4">Student Page</div>
      <div className="flex items-end justify-end pr-16">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create +
        </button>

        {isOpen && (
          <StudentForm
            fetchStudents={refetch}
            student={student}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
      <StudentList fetchStudents={refetch} students={students} />
    </div>
  );
};

export default StudentPage;
