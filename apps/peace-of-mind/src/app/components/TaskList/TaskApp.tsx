import React, { useState } from "react";
import { initialTasks } from "./initialTasks";
import { TaskList } from "./TaskList";
import { AddTaskForm } from "./AddTaskForm";

const TaskApp: React.FC = () => {
  const [tasks, setTasks] = useState<Array<Task>>(initialTasks);

  const toggleComplete: ToggleComplete = selectedTask => {
    const updatedTasks = tasks.map(task => {
      if (task === selectedTask) {
        return { ...task, complete: !task.complete };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const addTask: AddTask = newTask => {
    newTask.trim() !== "" &&
      setTasks([...tasks, { text: newTask, complete: false }]);
  };

  return (
    <React.Fragment>
      <TaskList tasks={tasks} toggleComplete={toggleComplete} />
      <AddTaskForm addTask={addTask} />
    </React.Fragment>
  );
};

export default TaskApp;
