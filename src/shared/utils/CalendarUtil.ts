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

  const result: Omit<DayItems, "menu" | "like" | "dateString">[] = [];
  // 이전 달 평일 filler 정책 (Policy B): 월요일 시작이 아닌 경우 항상 이전 달 평일 5일(or 필요한 수) 채우기
  // firstDayOfWeek: 0=Sun,1=Mon,...,6=Sat
  let fillerCount: number;
  if (firstDayOfWeek === 0) fillerCount = 5; // Sunday -> Mon-Fri
  else if (firstDayOfWeek === 6) fillerCount = 5; // Saturday -> Mon-Fri
  else fillerCount = firstDayOfWeek - 1; // Tue(2)->1, Wed(3)->2 ... Mon(1)->0

  if (fillerCount > 0) {
    // 이전 달 마지막 날짜 객체 (day=0 은 현재 달의 이전 달 마지막 날)
    const prevMonthLast = new Date(year, month - 1, 0);
    const prevMonthLastDate = prevMonthLast.getDate();
    const startDay = prevMonthLastDate - fillerCount + 1;
    for (let day = startDay; day <= prevMonthLastDate; day++) {
      const d = new Date(year, month - 2, day); // month(1..12)-2 => 이전 달(0-based)
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
