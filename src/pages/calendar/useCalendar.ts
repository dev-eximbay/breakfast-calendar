import { useCallback, useMemo, useState } from "react";
import type { BreakfastItem, DateType, DayItems } from "../../shared/types";
import { getCalendarDate, getYMDNow } from "../../shared/utils/CalendarUtil";
import { useBreakfastMenu } from "../../store/useMuenuStroe";

export const useCalendar = () => {
  const [date, setDate] = useState<DateType>(getYMDNow());

  const { year, month } = date;

  const {
    data: breakfastItems,
    isLoading,
    error,
  } = useBreakfastMenu(year, month);

  const getItem = useCallback(
    (day: number): BreakfastItem | undefined => {
      if (!breakfastItems) return;
      const menuEntry = breakfastItems.find((item) => {
        return (
          item.dateString ===
          `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`
        );
      });
      return menuEntry;
    },
    [breakfastItems, year, month]
  );

  const prevMonthHandler = () => {
    if (month === 0) {
      setDate((prev) => ({
        ...prev,
        year: prev.year - 1,
        month: 11,
      }));
    } else {
      setDate((prev) => ({
        ...prev,
        month: prev.month - 1,
      }));
    }
  };

  const nextMonthHandler = () => {
    if (month === 11) {
      setDate((prev) => ({
        ...prev,
        year: prev.year + 1,
        month: 0,
      }));
    } else {
      setDate((prev) => ({
        ...prev,
        month: prev.month + 1,
      }));
    }
  };

  const calendarList: DayItems[] = useMemo(
    () =>
      getCalendarDate(year, month).map((day) => {
        const item = getItem(day.date.getDate());
        return {
          ...day,
          menu: item?.menu || "",
          like: item?.like || 0,
          dateString: item?.dateString || "",
        };
      }),
    [year, month, getItem]
  );

  return {
    year,
    month,
    calendarList,
    isLoading,
    error,
    prevMonthHandler,
    nextMonthHandler,
  };
};
