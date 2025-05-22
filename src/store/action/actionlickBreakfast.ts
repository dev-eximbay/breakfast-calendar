import { doc, increment, updateDoc } from "firebase/firestore";
import { getFirestoreCollection } from "../../shared/firesbase";

export const likeBreakfast = async (dateString: string) => {
  console.log("## likeBreakfast", dateString);

  try {
    const likeMenusString = localStorage.getItem("likeMenus");
    const likeMenus = likeMenusString ? JSON.parse(likeMenusString) : [];
    const isLiked = likeMenus.includes(dateString);

    const collection = getFirestoreCollection("breakfasts");
    const docRef = doc(collection, dateString);
    const like = isLiked ? -1 : 1;
    await updateDoc(docRef, {
      like: increment(like),
    });

    if (isLiked) {
      const updatedLikeMenus = likeMenus.filter(
        (menu: string) => menu !== dateString
      );
      localStorage.setItem("likeMenus", JSON.stringify(updatedLikeMenus));
    } else {
      localStorage.setItem(
        "likeMenus",
        JSON.stringify([...likeMenus, dateString])
      );
    }
  } catch (error) {
    console.error("Error liking breakfast:", error);
  }
};

export const unlikeBreakfast = async (dateString: string) => {
  console.log("## unlikeBreakfast", dateString);

  const collection = getFirestoreCollection("breakfasts");
  const docRef = doc(collection, dateString);
  await updateDoc(docRef, {
    like: increment(-1),
  });
};
