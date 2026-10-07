export type QuestionType = 'mcq' | 'essay' | 'drag_drop' | 'table' | 'equation_fill';

export type Category = 'unit1_matter' | 'unit2_reactions';

export interface MCQQuestion {
  id: string;
  unit: Category;
  unitTitle: string;
  sourcePage: number;
  questionNumber: number;
  text: string;
  diagramType?: string;
  options: {
    id: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface EssaySubQuestion {
  id: string;
  subNumber: number | string;
  prompt: string;
  correctAnswer: string;
  acceptedKeywords?: string[];
  explanation?: string;
}

export interface EssayQuestion {
  id: string;
  unit: Category;
  unitTitle: string;
  sourcePage: number;
  questionNumber: number;
  title: string;
  scenario?: string;
  diagramType?: string;
  subQuestions: EssaySubQuestion[];
}

export interface DragItem {
  id: string;
  label: string;
  formula?: string;
  category: string;
  subLabel?: string;
  color?: string;
}

export interface DragDropActivity {
  id: string;
  title: string;
  sourcePage: number;
  instructions: string;
  categories: {
    id: string;
    label: string;
    color: string;
    description?: string;
  }[];
  items: DragItem[];
}

export interface StudentProfile {
  name: string;
  section: string; // e.g., الصف الثامن / 1
  score: number;
  streak?: number;
  badges?: string[];
}

export type AppMode =
  | 'adventure'
  | 'assessment'
  | 'drag_drop'
  | 'practice_essay'
  | 'practice_mcq'
  | 'summary';

