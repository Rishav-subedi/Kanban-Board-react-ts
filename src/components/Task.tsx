import { useDrag } from "react-dnd";
import { TaskType } from "../interface/types";

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
      {task.name}
    </div>
  );
};

export default Task;
