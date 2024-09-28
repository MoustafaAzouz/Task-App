// types.ts

export interface Task {
  id?: number; // Ensure the id is present
  title: string;
  description: string;
  category?: string;
  isCompleted: boolean;
  dueDate?: string; 
  userName?: string; // Add username field to Task type

  }
  
  export interface TasksState {
    tasks: Task[];
    selectedTask: Task | null; // Add this line
    loading: boolean;
    error: string | null;
  }
  