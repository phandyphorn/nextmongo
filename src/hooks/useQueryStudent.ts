import { getBaseUrlId } from "@/config";
import { Student } from "@/types/studentType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getStudent = async (id: string) => {
  const url = getBaseUrlId("students", id);
  const response = await axios.get<Student>(url);
  return response;
};

export default function useQueryStudent(id: string) {
  const { isPending, isError, data, error, refetch, ...query } = useQuery({
    queryKey: ["query-student", id],
    queryFn: () => getStudent(id),
    enabled: !!id,
  });

  return { student: data?.data, isPending, refetch, ...query };
}
