import React, { useState, ChangeEvent } from 'react';
import TaskItem from './TaskItem';
import { saveAs } from 'file-saver';
import { useTasks } from './TaskContext';

function TaskList() {
  const { tasks, addTask, updateTasks, filterTasks, sortTasks } = useTasks();
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask({ text: newTask, completed: false });
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    updateTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    updateTasks(updatedTasks);
  };

  const saveTasksToFile = () => {
    const json = JSON.stringify(tasks, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, 'tasks.json');
  };

  const loadTasksFromFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const tasks = JSON.parse(e.target?.result as string);
        updateTasks(tasks);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <div>
        <label>
          Filter:
          <select onChange={(e) => filterTasks(e.target.value as 'all' | 'completed' | 'incomplete')}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </label>
        <label>
          Sort:
          <select onChange={(e) => sortTasks(e.target.value as 'date' | 'alphabetically')}>
            <option value="date">By Date</option>
            <option value="alphabetically">Alphabetically</option>
          </select>
        </label>
      </div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              index={index}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      ) : (
        <p>No tasks available</p>
      )}
      <div className="button-container">
        <input
          type="file"
          onChange={loadTasksFromFile}
          style={{ display: 'none' }}
          id="loadFile"
        />
        <label htmlFor="loadFile" className="button">Load from JSON</label>
        <button onClick={saveTasksToFile}>Save to JSON</button>
      </div>
    </div>
  );
}

export default TaskList;
