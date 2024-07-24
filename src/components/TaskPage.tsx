// src/pages/TaskPage.tsx
import React from 'react';
import TaskList from '../components/TaskList';
import useTasks from '../hooks/useTasks';

function TaskPage() {
  const { tasks, addTask, updateTasks } = useTasks();

  return (
    <div>
      <h1>Task List</h1>
      <TaskList tasks={tasks} addTask={addTask} updateTasks={updateTasks} />
    </div>
  );
}

export default TaskPage;
