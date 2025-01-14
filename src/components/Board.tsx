import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import { ColumnType, TaskType } from "../interface/types";
import useLocalStorageState from "use-local-storage-state";
import { addTaskToColumn, removeTaskFromColumn, addColumn, deleteColumn, moveColumn } from "../utils/columnUtility";
import { moveTaskInColumn, moveTaskAcrossColumns } from "../utils/TaskUtility";


const Board = () => {
  const [columns, setColumns] = useLocalStorageState<ColumnType[]>("columns", {
    defaultValue: [
      { id: 1, name: "Todo", tasks: [] },
      { id: 2, name: "In Progress", tasks: [] },
      { id: 3, name: "Done", tasks: [] },
    ],
  });
  const handleAddTask = (columnId: number, task: TaskType) => {
    setColumns((prevColumns) => addTaskToColumn(prevColumns, columnId, task));
  };
  
  const handleRemoveTask = (task: TaskType, columnId: number) => {
    setColumns((prevColumns) => removeTaskFromColumn(prevColumns, columnId, task.id));
  };
  
  const handleAddColumn = () => {
    const newColumnName = prompt("Enter new column name:", "New Column");
    if (newColumnName) {
      setColumns((prevColumns) => addColumn(prevColumns, newColumnName));
    }
  };
  
  const handleDeleteColumn = (columnId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this column?");
    if (confirmDelete) {
      setColumns((prevColumns) => deleteColumn(prevColumns, columnId));
    }
  };
  
  const handleMoveTask = (taskId: number, direction: string, columnId: number) => {
    setColumns((prevColumns) => moveTaskInColumn(prevColumns, columnId, taskId, direction));
  };
  
  const handleMoveTaskAcrossColumns = (taskId: number, sourceColumnId: number, targetColumnId: number) => {
    setColumns((prevColumns) => moveTaskAcrossColumns(prevColumns, sourceColumnId, targetColumnId, taskId));
  };

  const handleMoveColumn = (columnId: number, direction: 'left' | 'right') => {
    setColumns((prevColumns) => moveColumn(prevColumns, columnId, direction));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            handleAddTask={handleAddTask}
            handleRemoveTask={handleRemoveTask}
            handleDeleteColumn={handleDeleteColumn}
            handleMoveTask={handleMoveTask}
            handleMoveTaskAcrossColumns={handleMoveTaskAcrossColumns}
            handleMoveColumn={handleMoveColumn}
          />
        ))}
        <button onClick={handleAddColumn}>Add New Column</button>
      </div>
    </DndProvider>
  );
};

export default Board;
