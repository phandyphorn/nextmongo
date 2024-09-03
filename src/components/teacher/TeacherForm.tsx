"use client";

import { baseUrlSubject, baseUrlTeacher } from "@/config";
import { Subject } from "@/types/subjectType";
import { TeacherRequest } from "@/types/teacherType";
import { useState, useEffect } from "react";

const TeacherForm = ({
  teacher,
  setIsOpen,
  fetchTeachers,
}: {
  teacher: TeacherRequest;
  setIsOpen: (value: boolean) => void;
  fetchTeachers: () => void;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const fetchSubjects = async () => {
    try {
      let res = await fetch(baseUrlSubject);
      let data = await res.json();
      setSubjects(data as Subject[]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    setFirstName(teacher.firstName);
    setLastName(teacher.lastName);
    setGender(teacher.gender);
    setPhoneNumber(teacher.phoneNumber);
    setSubjectId(teacher.subject);
  }, [teacher]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (teacher._id) {
        try {
          const response = await fetch(baseUrlTeacher, {
            method: "PUT",
            body: JSON.stringify({
              id: teacher._id,
              updateData: {
                _id: teacher._id,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                phoneNumber: phoneNumber,
                subject: subjectId,
              },
            }),
          });
          setIsOpen(false);

          if (!response.ok) {
            throw new Error("Failed to update teacher");
          }
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
          }

          fetchTeachers();
        } catch (err) {
          console.log(err);
        }
        return;
      }
      const response = await fetch(baseUrlTeacher, {
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          gender,
          phoneNumber,
          subject: subjectId,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setFirstName("");
      setLastName("");
      setGender("");
      setPhoneNumber("");
      setSubjectId("");
      setIsOpen(false);
      fetchTeachers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 shadow-lg">
        <div className="min-w-lg mx-auto w-96">
          <form
            onSubmit={handleSubmit}
            className="min-w-screen-lg mx-auto mt-4 p-6 bg-white shadow-lg rounded-lg space-y-4"
          >
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name:
              <input
                className="block w-full p-2 border border-gray-300 w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name:
              <input
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender:
              <select
                value={gender}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number:
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </label>
            <label
              htmlFor="subjectId"
              className="block text-sm font-medium text-gray-700"
            >
              Subject:
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="text-end">
              <button
                onClick={() => setIsOpen(false)}
                data-modal-hide="popup-modal"
                type="button"
                className="text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Cancel
              </button>
              <button
                data-modal-hide="popup-modal"
                type="submit"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-blue-500 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                {teacher._id ? "Save" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TeacherForm;
