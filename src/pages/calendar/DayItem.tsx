import { useEffect, useState } from "react";
import { MdThumbUpAlt, MdThumbUpOffAlt } from "react-icons/md";
import type { DayItems } from "../../shared/types";
import { useLiekdMenu } from "../../store/useMuenuStroe";

type DayItemProps = {} & DayItems;

const getLikeMenus = () => {
  const likeMenusString = localStorage.getItem("likeMenus");
  return likeMenusString ? JSON.parse(likeMenusString) : [];
};

const DayItem = ({
  date,
  dateString,
  isCurrentMonth,
  isToday,
  menu,
  like,
}: DayItemProps) => {
  const { mutateAsync: likeMenu } = useLiekdMenu();
  const [likeMenus, setLikeMenus] = useState<string[]>(getLikeMenus());
  const [isLike, setIsLike] = useState(likeMenus.includes(dateString)); // 현재 좋아요 상태
  const isLiked = likeMenus.includes(dateString); // 기존에 좋아요 상태였는지

  const liekCount = (() => {
    if (isLiked === true && isLiked !== isLike) {
      // 좋아요 상태가 바뀌었을 때
      return like - 1;
    }

    if (isLiked === false && isLiked !== isLike) {
      // 좋아요 상태가 바뀌었을 때
      return like + 1;
    }

    return like;
  })();

  useEffect(() => {
    const updatedLikeMenus = getLikeMenus();
    setIsLike(updatedLikeMenus.includes(dateString));
    setLikeMenus(getLikeMenus());
  }, [dateString, menu]);

  const handleClick = () => {
    likeMenu(dateString).then(() => {
      setIsLike(!isLike);
    });
  };

  return (
    <div
      className={`flex min-h-[100px] w-full flex-col items-center rounded p-2 ${
        isCurrentMonth ? "bg-gray-800" : "bg-gray-500"
      } ${isCurrentMonth ? "text-white" : "text-gray-400"}`}>
      <div
        className={`flex h-[30px] w-[30px] items-center justify-center rounded-full ${
          isToday ? "bg-blue-500" : ""
        }`}>
        {date.getDate()}
      </div>
      <div className="my-1 h-[1px] w-full bg-white"></div>
      <span className="flex-1 mt-1 text-xs">{menu}</span>
      <div className="w-full flex justify-end gap-1 items-center">
        <button className="cursor-pointer" onClick={handleClick}>
          {isLike ? <MdThumbUpAlt /> : <MdThumbUpOffAlt />}
        </button>
        <p className="text-xs">{liekCount}</p>
      </div>
    </div>
  );
};

export default DayItem;
