import { getBaseUrlId } from "@/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { QUERY_STUDENT } from "./useQueryStudents";

const deleteStudent = async (id: string) => {
  const url = getBaseUrlId("students", id);
  const res = await axios.delete(url);
  return res.data;
};

export default function useMutationDeleteStudent() {
  return useMutation({
    mutationKey: [QUERY_STUDENT],
    mutationFn: (id: string) => deleteStudent(id),
  });
}
