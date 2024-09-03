"use client";

import useMutationAddStudent from "@/hooks/useMutationAddStudent";
import useMutationUpdateStudent from "@/hooks/useMutationUpdateStudent";
import useQueryStudent from "@/hooks/useQueryStudent";
import { useState, useEffect } from "react";

const StudentForm = ({
  id,
  setIsOpen,
  fetchStudents,
}: {
  id: string;
  setIsOpen: (value: boolean) => void;
  fetchStudents: () => void;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const { mutateAsync: addStudent } = useMutationAddStudent();
  const { mutateAsync: updateStudent } = useMutationUpdateStudent();
  const { student } = useQueryStudent(id);

  useEffect(() => {
    if (!student) {
      return;
    }
    setFirstName(student.firstName);
    setLastName(student.lastName);
    setGender(student.gender);
  }, [student]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (!!student && student._id) {
        try {
          await updateStudent({
            id: id,
            student: {
              firstName: firstName,
              lastName: lastName,
              gender: gender,
            },
          });
          setIsOpen(false);
          await fetchStudents();
        } catch (err) {
          console.log(err);
        }
        return;
      }

      addStudent({ firstName: firstName, lastName: lastName, gender: gender });
      fetchStudents(); //ban mk pi refetch in student page.

      setFirstName("");
      setLastName("");
      setGender("");
      setIsOpen(false);
      fetchStudents();
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
                {!!student && student._id ? "Save" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentForm;
