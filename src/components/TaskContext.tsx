import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Task {
  text: string;
  completed: boolean;
}

interface TasksContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTasks: (tasks: Task[]) => void;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};
