import type { DayItems } from "../../shared/types";

type DayItemProps = {} & DayItems;

const DayItem = ({ date, isCurrentMonth, isToday, menu }: DayItemProps) => {
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
    </div>
  );
};

export default DayItem;
