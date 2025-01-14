import { useDrag } from "react-dnd";
import { TaskType } from "../interface/types";
import { Card, Typography } from "@mui/material";

interface TaskProps {
  task: TaskType;
  columnId: number;
  handleMoveTask: (taskId: number, direction: string, columnId: number) => void;
  handleMoveTaskAcrossColumns: (
    taskId: number,
    sourceColumnId: number,
    targetColumnId: number
  ) => void;
}

const Task: React.FC<TaskProps> = ({
  task,
  columnId,
  handleMoveTask,
  handleMoveTaskAcrossColumns,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { task, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const draggingStyle = {
    opacity: isDragging ? 0.5 : 1,
    marginBottom: "8px",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

  const handleKeyDownTask = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      handleMoveTask(task.id, "up", columnId);
    } else if (e.key === "ArrowDown") {
      handleMoveTask(task.id, "down", columnId);
    } else if (e.key === "ArrowLeft") {
      handleMoveTaskAcrossColumns(task.id, columnId, columnId - 1);
    } else if (e.key === "ArrowRight") {
      handleMoveTaskAcrossColumns(task.id, columnId, columnId + 1);
    }
  };

  return (
    <div
      ref={drag}
      tabIndex={0}
      style={draggingStyle}
      onKeyDown={handleKeyDownTask}
      {...drag}
    >
      <Card
        style={{
          marginBottom: "10px",
          padding: "10px",
          cursor: "grab",
          boxShadow: isDragging
            ? "0 4px 8px rgba(0, 0, 0, 0.2)"
            : "0 1px 3px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        elevation={isDragging ? 6 : 2}
      >
        <Typography variant="body1">{task.name}</Typography>
      </Card>
    </div>
  );
};

export default Task;
