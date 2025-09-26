import { useSearchParams } from "react-router-dom";

export function usePagination(searchParam: string, numItemsPerPage: number) {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get(searchParam));
  const startIndex = currentPage * numItemsPerPage;
  const endIndex = (currentPage + 1) * numItemsPerPage;

  return { startIndex, endIndex };
}
