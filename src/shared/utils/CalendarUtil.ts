import type { DateType, DayItems } from "../types";

export const getYMDNow = (): DateType => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  // const day = now.getDate();
  return { year, month };
};

export const getCalendarDate = (year: number, month: number) => {
  const { year: currentYear, month: currentMonth } = getYMDNow();
  const currentDay = new Date().getDate();
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0);
  const totalDays = endOfMonth.getDate();
  const firstDayOfWeek = startOfMonth.getDay();
  // const prevMonthDate = new Date(year, month - 1, 0);
  // const prevMonthTotalDays = prevMonthDate.getDate();

  const result: Omit<DayItems, "menu">[] = [];

  // 이전 달 날짜
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const prevMonthDate = new Date(year, month - 2, 0);
    const prevMonthTotalDays = prevMonthDate.getDate();
    const d = new Date(year, month - 2, prevMonthTotalDays - i);

    if (d.getDay() >= 1 && d.getDay() <= 5) {
      const isToday =
        d.getDate() === currentDay &&
        d.getMonth() + 1 === currentMonth &&
        d.getFullYear() === currentYear;

      result.push({
        date: d,
        isCurrentMonth: false,
        isToday,
      });
    }
  }

  // 현재 달 날짜
  for (let i = 1; i <= totalDays; i++) {
    const d = new Date(year, month - 1, i);
    if (d.getDay() >= 1 && d.getDay() <= 5) {
      const isToday =
        d.getDate() === currentDay &&
        d.getMonth() + 1 === currentMonth &&
        d.getFullYear() === currentYear;

      result.push({
        date: d,
        isCurrentMonth: true,
        isToday,
      });
    }
  }

  return result;
};
