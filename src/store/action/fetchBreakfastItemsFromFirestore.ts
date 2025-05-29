import { documentId, getDocs, query, where } from "firebase/firestore";
import { getFirestoreCollection } from "../../shared/firesbase";
import type { BreakfastItem } from "../../shared/types";

// Firestore에서 아침 메뉴 데이터를 가져오는 함수 (react-query와 함께 사용)
export const fetchBreakfastItemsFromFirestore = async (
  year: number,
  month: number
): Promise<BreakfastItem[]> => {
  const startId = `${year}-${month.toString().padStart(2, "0")}-01`;
  const endId = `${year}-${month.toString().padStart(2, "0")}-31`;

  try {
    const collection = getFirestoreCollection("breakfasts");
    const q = query(
      collection,
      where(documentId(), ">=", startId),
      where(documentId(), "<=", endId)
    );
    const docsList = await getDocs(q);
    const items: BreakfastItem[] = [];
    docsList.forEach((doc) => {
      const data = doc.data();
      items.push({
        menu: data.menu,
        dateString: data.dateString,
        date: new Date(data.dateString),
        like: data.like || 0,
      });
    });

    return items;
  } catch (error) {
    console.error("Error fetching breakfast items:", error);
    throw error; // react-query에서 에러를 처리할 수 있도록 throw
  }
};
