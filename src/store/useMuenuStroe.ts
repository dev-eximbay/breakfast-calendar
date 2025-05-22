import { useMutation, useQuery, type QueryKey } from "@tanstack/react-query"; // react-query import
import { likeBreakfast } from "./action/actionlickBreakfast";
import { fetchBreakfastItemsFromFirestore } from "./action/fetchBreakfastItemsFromFirestore";

// 아침 메뉴 데이터를 관리하는 커스텀 훅
export const useBreakfastMenu = (year: number, month: number) => {
  const queryKey: QueryKey = ["breakfastItems", year, month]; // 쿼리 키 타입 명시

  return useQuery({
    queryKey,
    queryFn: () => fetchBreakfastItemsFromFirestore(year, month),
    staleTime: Infinity,
  });
};

export const useLiekdMenu = () => {
  return useMutation({
    mutationFn: likeBreakfast,
  });
};
