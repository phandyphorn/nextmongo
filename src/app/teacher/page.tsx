"use client";

import React, { useEffect, useState } from "react";
import { baseUrlTeacher } from "@/config";
import TeacherForm from "@/components/teacher/TeacherForm";
import { TeacherListing } from "@/types/teacherType";
import TeacherList from "@/components/teacher/TeacherList";

const TeacherPage = () => {
  const [teachers, setTeachers] = useState<TeacherListing[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const teacher = {
    _id: "",
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    subject: "",
  };

  const fetchTeachers = async () => {
    try {
      let res = await fetch(baseUrlTeacher);
      let data = await res.json();
      setTeachers(data as TeacherListing[]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);
  return (
    <div className="max-w-screen-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-4 mt-4">
      <div className="text-center font-bold p-4">Teacher Page</div>
      <div className="flex items-end justify-end pr-16">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create +
        </button>

        {isOpen && (
          <TeacherForm
            fetchTeachers={fetchTeachers}
            teacher={teacher}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
      <TeacherList fetchTeachers={fetchTeachers} teachers={teachers} />
    </div>
  );
};

export default TeacherPage;
