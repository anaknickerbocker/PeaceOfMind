export type Task = {
  text: string;
  complete: boolean;
};

export type ToggleComplete = (selectedTask: Task) => void;

export type AddTask = (newTask: string) => void;
