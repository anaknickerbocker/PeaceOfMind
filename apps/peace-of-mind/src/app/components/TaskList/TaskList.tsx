import React from "react";
import {Task} from '@peace-of-mind/api-interfaces'
import { TaskListItem } from "./TaskListItem";

export const TaskList = (props: {
  tasks: Array<Partial<Task>>,
}) => {
  return (
    <ul>
      {props.tasks.map(task => (
        <TaskListItem
          key={task.description}
          task={task}
        />
      ))}
    </ul>
  );
};
