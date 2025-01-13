import { useDrag } from "react-dnd";
import { TaskType } from "../interface/types";

interface TaskProps {
  task: TaskType;
  columnId: number;
  handleMoveTask: (taskId: number, direction: string, columnId: number) => void;

}

const Task: React.FC<TaskProps> = ({ task, columnId, handleMoveTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { task, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Apply dragging styles
  const draggingStyle = {
    opacity: isDragging ? 0.5 : 1,  // Change opacity while dragging
    marginBottom: "8px",
    background: "white",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      // Move task up within the column (can be refined further for actual reordering)
      handleMoveTask(task.id, 'up', columnId);
    } else if (e.key === 'ArrowDown') {
      // Move task down within the column
      handleMoveTask(task.id, 'down', columnId);
    } else if (e.key === 'ArrowLeft' && columnId > 1) {
      // Move task left to the previous column (ensure columnId > 1 for safety)
      handleMoveTask(task.id, 'left', columnId);
    } else if (e.key === 'ArrowRight' && columnId < 3) {
      // Move task right to the next column (ensure columnId < 3 for safety)
      handleMoveTask(task.id, 'right', columnId);
    }
  };


  return (
    <div
      ref={drag} // Drag ref attached here
      tabIndex={0} // Make the task focusable for keyboard accessibility
      style={draggingStyle}
      onKeyDown={handleKeyDown}
      {...drag}  // Spread all necessary props to the div
    >
      {task.name}
    </div>
  );
};

export default Task;
