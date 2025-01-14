import { ColumnType } from "../interface/types";

// Moves a task within the same column (up or down)
export const moveTaskInColumn = (
  columns: ColumnType[],
  columnId: number,
  taskId: number,
  direction: string
): ColumnType[] => {
  const columnIndex = columns.findIndex((col) => col.id === columnId);
  if (columnIndex !== -1) {
    const column = columns[columnIndex];
    const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      const updatedTasks = [...column.tasks];
      if (direction === "up" && taskIndex > 0) {
        // Move task up within the column
        const task = updatedTasks.splice(taskIndex, 1)[0];
        updatedTasks.splice(taskIndex - 1, 0, task);
      } else if (direction === "down" && taskIndex < column.tasks.length - 1) {
        // Move task down within the column
        const task = updatedTasks.splice(taskIndex, 1)[0];
        updatedTasks.splice(taskIndex + 1, 0, task);
      }
      const updatedColumn = { ...column, tasks: updatedTasks };
      const updatedColumns = [...columns];
      updatedColumns[columnIndex] = updatedColumn;
      return updatedColumns;
    }
  }
  return columns;
};

// Moves a task between columns
export const moveTaskAcrossColumns = (
  columns: ColumnType[],
  sourceColumnId: number,
  targetColumnId: number,
  taskId: number
): ColumnType[] => {
  const sourceColumnIndex = columns.findIndex((col) => col.id === sourceColumnId);
  const targetColumnIndex = columns.findIndex((col) => col.id === targetColumnId);

  if (sourceColumnIndex !== -1 && targetColumnIndex !== -1) {
    const sourceColumn = columns[sourceColumnIndex];
    const targetColumn = columns[targetColumnIndex];
    const taskIndex = sourceColumn.tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      const task = sourceColumn.tasks[taskIndex];

      // Remove the task from the source column
      const updatedSourceTasks = sourceColumn.tasks.filter((task) => task.id !== taskId);

      // Add the task to the target column
      const updatedTargetTasks = [...targetColumn.tasks, task];

      const updatedSourceColumn = { ...sourceColumn, tasks: updatedSourceTasks };
      const updatedTargetColumn = { ...targetColumn, tasks: updatedTargetTasks };

      const updatedColumns = [...columns];
      updatedColumns[sourceColumnIndex] = updatedSourceColumn;
      updatedColumns[targetColumnIndex] = updatedTargetColumn;
      
      return updatedColumns;
    }
  }
  return columns;
};
