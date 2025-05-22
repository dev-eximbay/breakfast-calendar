export type BreakfastItem = {
  menu: string;
  dateString: string;
  date: Date; // Firestore 타임스탬프를 Date 객체로 변환하여 사용한다고 가정합니다.
};

export interface DayItems {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  menu: string;
}

export type DateType = {
  year: number;
  month: number;
};
