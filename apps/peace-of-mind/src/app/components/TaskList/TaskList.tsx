import React from 'react';
import { Task } from '@peace-of-mind/api-interfaces';
import { TaskListItem } from './TaskListItem';

export const TaskList = (props: {
  tasks: Array<Task>;
  setTasks: (tasks: Array<Task>) => void;
}) => {
  return (
    
    <ul>
      {props.tasks.map((task, index) => (
        <TaskListItem key={`${task.description}-${index}`} task={task} />
      ))}
    </ul>
  );
};
