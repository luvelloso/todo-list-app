import type { Category, CategoryId } from '../types/task'
export const CATEGORIES: Category[] = [
  { id: 'design',   label: 'Design'   },
  { id: 'personal', label: 'Personal' },
  { id: 'house',    label: 'House'    },
  { id: 'work',     label: 'Work'     },
  { id: 'health',   label: 'Health'   },
]

export const DEFAULT_CATEGORY_ID: CategoryId = 'personal'

export const HABIT_SUGGESTIONS: Array<{ label: string; categoryId: CategoryId }> = [
  { label: 'Exercise',              categoryId: 'health'   },
  { label: 'Read books',            categoryId: 'personal' },
  { label: 'Meditate',              categoryId: 'personal' },
  { label: 'Plan meals',            categoryId: 'house'    },
  { label: 'Water plants',          categoryId: 'house'    },
  { label: 'Journal',               categoryId: 'personal' },
  { label: 'Stretch for 15 mins',   categoryId: 'health'   },
  { label: 'Review goals before bed', categoryId: 'personal' },
]