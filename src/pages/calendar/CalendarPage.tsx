import { MdArrowBackIos } from "react-icons/md";
import { Layout } from "../../ui/Layout";
import DayItem from "./DayItem";
import { useCalendar } from "./useCalendar";

export const MenuPage = () => {
  const {
    year,
    month,
    calendarList,
    error,
    prevMonthHandler,
    nextMonthHandler,
  } = useCalendar();

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Error loading calendar data.
      </div>
    );
  }

  return (
    <Layout>
      <div className="mb-4 flex items-center justify-between">
        <button onClick={prevMonthHandler} className="cursor-pointer p-4">
          <MdArrowBackIos />
        </button>
        <h2 className="text-xl font-bold">
          {year}년 {month}월
        </h2>
        <button onClick={nextMonthHandler} className="cursor-pointer p-4">
          <MdArrowBackIos className="rotate-180" />
        </button>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {/* 요일 */}
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}

        {/* 날짜 */}
        {calendarList.map((item, index) => (
          <DayItem {...item} key={`DayItem-${index}`} />
        ))}
      </div>
    </Layout>
  );
};
