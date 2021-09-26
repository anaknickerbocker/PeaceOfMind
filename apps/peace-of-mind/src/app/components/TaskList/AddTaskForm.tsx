import React, { useState, ChangeEvent, FormEvent } from "react";
import { AddTask } from "./types";

interface AddTaskFormProps {
  addTask: AddTask;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ addTask }) => {
  const [newTask, setNewTask] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
  };

  return (
    <form>
      <input type="text" value={newTask} onChange={handleChange} />
      <button type="submit" onClick={handleSubmit}>
        Add Task
      </button>
    </form>
  );
};