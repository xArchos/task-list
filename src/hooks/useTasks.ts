// src/hooks/useTasks.ts
import { useState } from 'react';

interface Task {
  text: string;
  completed: boolean;
}

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };

  return {
    tasks,
    addTask,
    updateTasks,
  };
};

export default useTasks;
