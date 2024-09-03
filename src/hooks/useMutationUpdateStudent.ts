import { getBaseUrlId } from "@/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { QUERY_STUDENT } from "./useQueryStudents";

interface StudentReq {
  firstName: string;
  lastName: string;
  gender: string;
}

interface StudentUpdateReq {
  id: string;
  student: StudentReq;
}

const updateStudent = async ({ id, student }: StudentUpdateReq) => {
  const url = getBaseUrlId("students", id);
  const res = await axios.put(url, student);
  return res.data;
};

export default function useMutationUpdateStudent() {
  return useMutation({
    mutationKey: [QUERY_STUDENT],
    mutationFn: ({ id, student }: StudentUpdateReq) =>
      updateStudent({ id, student }),
  });
}
