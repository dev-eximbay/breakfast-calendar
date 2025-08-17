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
    if (month === 1) {
      setDate((prev) => ({ ...prev, year: prev.year - 1, month: 12 }));
    } else {
      setDate((prev) => ({ ...prev, month: prev.month - 1 }));
    }
  };

  const nextMonthHandler = () => {
    if (month === 12) {
      setDate((prev) => ({ ...prev, year: prev.year + 1, month: 1 }));
    } else {
      setDate((prev) => ({ ...prev, month: prev.month + 1 }));
    }
  };

  const calendarList: DayItems[] = useMemo(
    () =>
      getCalendarDate(year, month).map((day) => {
        const item = getItem(day.date.getDate());
        const y = day.date.getFullYear();
        const m = (day.date.getMonth() + 1).toString().padStart(2, "0");
        const d = day.date.getDate().toString().padStart(2, "0");
        return {
          ...day,
          menu: item?.menu || "",
          like: item?.like || 0,
          dateString: item?.dateString || `${y}-${m}-${d}`,
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
