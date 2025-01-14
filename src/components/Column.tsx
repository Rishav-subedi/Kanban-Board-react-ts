import React, { useState } from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";
import { ColumnType, TaskType } from "../interface/types";

interface ColumnProps {
  column: ColumnType;
  handleAddTask: (columnId: number, task: TaskType) => void;
  handleRemoveTask: (task: TaskType, columnId: number) => void;
  handleDeleteColumn: (columnId: number) => void;
  handleMoveTask: (taskId: number, direction: string, columnId: number) => void;
  handleMoveTaskAcrossColumns: (
    taskId: number,
    sourceColumnId: number,
    targetColumnId: number
  ) => void;
  handleMoveColumn: (columnId: number, direction: "left" | "right") => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  handleAddTask,
  handleRemoveTask,
  handleDeleteColumn,
  handleMoveTask,
  handleMoveTaskAcrossColumns,
  handleMoveColumn,
}) => {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName) {
      const newTask: TaskType = { id: Date.now(), name: taskName };
      handleAddTask(column.id, newTask);
      setTaskName("");
    }
  };
  
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item: { task: TaskType; columnId: number }) => {
      if (item.columnId !== column.id) {
        handleRemoveTask(item.task, item.columnId);
        handleAddTask(column.id, item.task);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(), 
    }),
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.shiftKey) { 
      if (e.key === "ArrowLeft") {
        handleMoveColumn(column.id, "left");
      } else if (e.key === "ArrowRight") {
        handleMoveColumn(column.id, "right");
      }
    }
  };

  return (
    <div
      key={column.id}
      tabIndex={0}
      role="button"
      onKeyDown={handleKeyDown}
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
        <Task
          key={task.id}
          task={task}
          columnId={column.id}
          handleMoveTask={handleMoveTask}
          handleMoveTaskAcrossColumns={handleMoveTaskAcrossColumns}
        />
      ))}
    </div>
  );
};

export default Column;
