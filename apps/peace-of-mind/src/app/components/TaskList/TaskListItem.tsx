import React from "react";
import "./TaskListItem.css";

interface TaskListItemProps {
  task: Task;
  toggleComplete: ToggleComplete;
}

export const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  toggleComplete
}) => {
  return (
    <li>
      <label className={task.complete ? "complete" : undefined}>
        <input
          type="checkbox"
          onChange={() => toggleComplete(task)}
          checked={task.complete}
        />
        {task.text}
      </label>
    </li>
  );
};