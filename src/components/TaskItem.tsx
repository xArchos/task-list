interface TaskItemProps {
  task: {
    text: string;
    completed: boolean;
  };
  index: number;
  toggleTaskCompletion: (index: number) => void;
  deleteTask: (index: number) => void;
}

function TaskItem({ task, index, toggleTaskCompletion, deleteTask }: TaskItemProps) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(index)}
        />
        {task.text}
      </label>
      <button onClick={() => deleteTask(index)}>Delete</button>
    </li>
  );
}

export default TaskItem;
