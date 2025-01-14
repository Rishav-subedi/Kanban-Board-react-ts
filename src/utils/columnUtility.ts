import { ColumnType, TaskType } from "../interface/types";

// Finds the index of a column by its ID
export const findColumnIndex = (columns: ColumnType[], columnId: number): number => {
  return columns.findIndex((col) => col.id === columnId);
};

// Adds a new task to the specified column
export const addTaskToColumn = (columns: ColumnType[], columnId: number, task: TaskType): ColumnType[] => {
  const columnIndex = findColumnIndex(columns, columnId);
  if (columnIndex !== -1) {
    const updatedColumns = [...columns];
    updatedColumns[columnIndex] = {
      ...updatedColumns[columnIndex],
      tasks: [...updatedColumns[columnIndex].tasks, task],
    };
    return updatedColumns;
  }
  return columns;
};

// Removes a task from the specified column
export const removeTaskFromColumn = (columns: ColumnType[], columnId: number, taskId: number): ColumnType[] => {
  const columnIndex = findColumnIndex(columns, columnId);
  if (columnIndex !== -1) {
    const updatedColumns = [...columns];
    updatedColumns[columnIndex] = {
      ...updatedColumns[columnIndex],
      tasks: updatedColumns[columnIndex].tasks.filter((task) => task.id !== taskId),
    };
    return updatedColumns;
  }
  return columns;
};

// Adds a new column to the board
export const addColumn = (columns: ColumnType[], newColumnName: string): ColumnType[] => {
  const newId = columns.length > 0 ? Math.max(...columns.map((col) => col.id)) + 1 : 1;
  const newColumn: ColumnType = {
    id: newId,
    name: newColumnName,
    tasks: [],
  };
  return [...columns, newColumn];
};

// Deletes a column by its ID
export const deleteColumn = (columns: ColumnType[], columnId: number): ColumnType[] => {
  return columns.filter((column) => column.id !== columnId);
};

// Moves a column left or right in the columns array
export const moveColumn = (columns: ColumnType[], columnId: number, direction: 'left' | 'right'): ColumnType[] => {
  const columnIndex = findColumnIndex(columns, columnId);
  if (columnIndex !== -1) {
    const updatedColumns = [...columns];

    // Calculate the target index based on the direction
    let targetIndex = columnIndex;
    if (direction === 'left' && columnIndex > 0) {
      targetIndex = columnIndex - 1;
    } else if (direction === 'right' && columnIndex < columns.length - 1) {
      targetIndex = columnIndex + 1;
    }

    // Swap the columns at the target and current index
    [updatedColumns[columnIndex], updatedColumns[targetIndex]] = [
      updatedColumns[targetIndex],
      updatedColumns[columnIndex],
    ];

    return updatedColumns;
  }
  return columns;
};