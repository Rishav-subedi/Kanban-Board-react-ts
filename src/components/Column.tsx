import React, {useState} from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";
import { ColumnType, TaskType } from "../interface/types";

interface ColumnProps {
  column: ColumnType;
  // setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
  handleAddTask: (columnId: number, task: TaskType) => void;
  handleRemoveTask: (task: TaskType, columnId: number) => void;
  handleDeleteColumn: (columnId: number) => void;
  handleMoveTask: (taskId: number, direction: string, columnId: number) => void;
}

const Column: React.FC<ColumnProps> = ({ column, handleAddTask, handleRemoveTask, handleDeleteColumn, handleMoveTask }) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName) {
      const newTask: TaskType = { id: Date.now(), name: taskName };
      handleAddTask(column.id, newTask);
      setTaskName("");
    }
  };
   // useDrop for handling drag-and-drop logic
   const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: { task: TaskType; columnId: number }) => {
      if (item.columnId !== column.id) {
        handleRemoveTask(item.task, item.columnId);
        handleAddTask(column.id, item.task);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(), // Used for styling purposes (highlight column on hover)
    }),
  });

  return (
    <div
      ref={drop}
      className={`column ${isOver ? "highlight" : ""}`}
    >
      <div className="column-header">
        <h2>{column.name}</h2>
        <button
          className="delete-column"
          onClick={() => handleDeleteColumn(column.id)}
          title="Delete Column"
        >
          X
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="New task..."
        />
        <button type="submit">Add Task</button>
      </form>
      {column.tasks.map((task) => (
        <Task key={task.id} task={task} columnId={column.id} handleMoveTask={handleMoveTask}/>
      ))}
    </div>
  );
};

export default Column;
