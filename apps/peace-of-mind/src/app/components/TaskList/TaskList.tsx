import React from "react";
import { Task, ToggleComplete } from "./types";
import { TaskListItem } from "./TaskListItem";

interface TaskListProps {
  tasks: Array<Task>;
  toggleComplete: ToggleComplete;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  toggleComplete
}) => {
  return (
    <ul>
      {tasks.map(task => (
        <TaskListItem
          key={task.text}
          task={task}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
};
