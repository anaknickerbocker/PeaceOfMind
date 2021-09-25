
type Task = {
  text: string;
  complete: boolean;
};

type ToggleComplete = (selectedTask: Task) => void;

type AddTask = (newTask: string) => void;