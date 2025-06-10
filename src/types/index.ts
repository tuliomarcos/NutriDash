export interface FoodItem {
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface Meal {
  name: string
  time: string
  items: FoodItem[]
}

export interface MealPlan {
  id: number
  patientId: number
  date: string
  meals: Meal[]
}

export interface Patient {
  id: number
  name: string
  email: string
  avatar: string
}
