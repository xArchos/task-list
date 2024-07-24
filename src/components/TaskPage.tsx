import TaskList from '../components/TaskList';
import { useTasks } from '../components/TaskContext';

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
