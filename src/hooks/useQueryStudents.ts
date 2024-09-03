import { baseUrlStudent } from "@/config";
import { StudentListing } from "@/types/studentType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const QUERY_STUDENT = "query-student";

const getStudents = async () => {
  const response = await axios.get<StudentListing[]>(baseUrlStudent);
  return response;
};

export default function useQueryStudents() {
  const { isPending, isError, data, error, refetch, ...query } = useQuery({
    queryKey: [QUERY_STUDENT],
    queryFn: getStudents,
  });

  return { students: data?.data, isPending, refetch, ...query };
}
