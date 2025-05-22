import { useQuery, type QueryKey } from "@tanstack/react-query"; // react-query import
import type { BreakfastItem } from "../shared/types";
import { fetchBreakfastItemsFromFirestore } from "./fetch/fetchBreakfastItemsFromFirestore";

// 아침 메뉴 데이터를 관리하는 커스텀 훅
export const useBreakfastMenu = (year: number, month: number) => {
  const queryKey: QueryKey = ["breakfastItems", year, month]; // 쿼리 키 타입 명시

  return useQuery<BreakfastItem[], Error, BreakfastItem[], QueryKey>({
    queryKey,
    queryFn: () => fetchBreakfastItemsFromFirestore(year, month),
    staleTime: Infinity,
  });
};
