import React from 'react';
import './TaskListItem.css';
import { Task } from '@peace-of-mind/api-interfaces';

export const TaskListItem = (props: { task: Partial<Task> }) => {
  return (
    <li>
      <label className={props.task.complete ? 'complete' : undefined}>
        {props.task.description}
      </label>
    </li>
  );
};
