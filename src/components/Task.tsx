import React from "react";
import { useDrag } from "react-dnd";

interface TaskProps {
  task: any;
  columnId: number;
}

const Task: React.FC<TaskProps> = ({ task, columnId }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { task, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`task ${isDragging ? "dragging" : ""}`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {task.name}
    </div>
  );
};

export default Task;
