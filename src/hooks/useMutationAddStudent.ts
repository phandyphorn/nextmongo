import { baseUrlStudent } from "@/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { QUERY_STUDENT } from "./useQueryStudents";

interface StudentReq {
  firstName: string;
  lastName: string;
  gender: string;
}

const createStudent = async (variable: StudentReq) => {
  const res = await axios.post(baseUrlStudent, variable);
  return res;
};

export default function useMutationAddStudent() {
  return useMutation({
    mutationKey: [QUERY_STUDENT],
    mutationFn: (variables: StudentReq) => createStudent(variables),
  });
}
