export type BreakfastItem = {
  menu: string;
  dateString: string;
  date: Date;
  like?: number;
};

export interface DayItems {
  date: Date;
  dateString: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  menu: string;
  like: number;
}

export type DateType = {
  year: number;
  month: number;
};
