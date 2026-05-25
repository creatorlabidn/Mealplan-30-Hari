export type MealType = 'Sarapan' | 'Makan Siang' | 'Makan Malam';

export interface Meal {
  title: string;
  description: string;
  type: MealType;
}

export interface DayPlan {
  day: number;
  meals: Meal[];
}
