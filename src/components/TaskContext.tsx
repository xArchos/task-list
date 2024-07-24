// src/context/TasksContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Task {
  text: string;
  completed: boolean;
}

interface TasksContextProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTasks: (tasks: Task[]) => void;
  filterTasks: (status: 'all' | 'completed' | 'incomplete') => void;
  sortTasks: (sortBy: 'date' | 'alphabetically') => void;
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'incomplete'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'alphabetically'>('date');

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };

  const filterTasks = (status: 'all' | 'completed' | 'incomplete') => {
    setFilterStatus(status);
  };

  const sortTasks = (sortBy: 'date' | 'alphabetically') => {
    setSortBy(sortBy);
  };

  const getFilteredAndSortedTasks = () => {
    let filteredTasks = tasks;
    if (filterStatus === 'completed') {
      filteredTasks = tasks.filter(task => task.completed);
    } else if (filterStatus === 'incomplete') {
      filteredTasks = tasks.filter(task => !task.completed);
    }

    if (sortBy === 'alphabetically') {
      filteredTasks.sort((a, b) => a.text.localeCompare(b.text));
    }
    

    return filteredTasks;
  };

  return (
    <TasksContext.Provider value={{ tasks: getFilteredAndSortedTasks(), addTask, updateTasks, filterTasks, sortTasks }}>
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
