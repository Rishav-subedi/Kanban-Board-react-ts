import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import { ColumnType, TaskType } from "../interface/types";
import useLocalStorageState from "use-local-storage-state";

const Board = () => {
  const [columns, setColumns] = useLocalStorageState<ColumnType[]>("columns", {
    defaultValue: [
      { id: 1, name: "Todo", tasks: [] },
      { id: 2, name: "In Progress", tasks: [] },
      { id: 3, name: "Done", tasks: [] },
    ],
  });

  // Function to handle keyboard accessibility
  const handleMoveTask = (taskId: number, direction: string, columnId: number) => {
    setColumns((prevColumns) => {
      let updatedColumns = [...prevColumns];
      const columnIndex = prevColumns.findIndex((col) => col.id === columnId);
  
      if (columnIndex !== -1) {
        const column = prevColumns[columnIndex];
        const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
  
        if (taskIndex !== -1) {
          let updatedTasks = [...column.tasks];
          if (direction === 'up' && taskIndex > 0) {
            // Move task up within the column
            const task = updatedTasks.splice(taskIndex, 1)[0];
            updatedTasks.splice(taskIndex - 1, 0, task);
            updatedColumns[columnIndex] = { ...column, tasks: updatedTasks };
          } else if (direction === 'down' && taskIndex < column.tasks.length - 1) {
            // Move task down within the column
            const task = updatedTasks.splice(taskIndex, 1)[0];
            updatedTasks.splice(taskIndex + 1, 0, task);
            updatedColumns[columnIndex] = { ...column, tasks: updatedTasks };
          } else if (direction === 'left' && columnIndex > 0) {
            // Move task to the previous column
            const task = updatedTasks.splice(taskIndex, 1)[0];
            const previousColumn = { ...prevColumns[columnIndex - 1] };
            previousColumn.tasks.push(task);
            updatedColumns[columnIndex - 1] = previousColumn;
            updatedColumns[columnIndex] = { ...column, tasks: updatedTasks };
          } else if (direction === 'right' && columnIndex < prevColumns.length - 1) {
            // Move task to the next column
            const task = updatedTasks.splice(taskIndex, 1)[0];
            const nextColumn = { ...prevColumns[columnIndex + 1] };
            nextColumn.tasks.push(task);
            updatedColumns[columnIndex + 1] = nextColumn;
            updatedColumns[columnIndex] = { ...column, tasks: updatedTasks };
          }
        }
      }
  
      return updatedColumns;
    });
  };
  // Add task to a specific column
  const handleAddTask = (columnId: number, task: TaskType) => {
    console.log(`Adding task: ${task.id} to column: ${columnId}`);
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
      )
    );
  };

  // Remove task from the column
  const handleRemoveTask = (task: TaskType, columnId: number) => {
    console.log(`Removing task: ${task.id} from column: ${columnId}`);
    setColumns((prevColumns) =>
      prevColumns.map((col) => {
        if (col.id === columnId) {
          const updatedTasks = col.tasks.filter((t) => t.id !== task.id);
          return { ...col, tasks: updatedTasks };
        }
        return col;
      })
    );
  };

  // Add a new column
  const handleAddColumn = () => {
    const newColumnName = prompt("Enter new column name:", "New Column");
    if (newColumnName) {
      const newColumn: ColumnType = {
        id: Date.now(), // Generate unique ID using current timestamp
        name: newColumnName,
        tasks: [],
      };
      setColumns((prevColumns) => [...prevColumns, newColumn]);
    }
  };

  // Delete a column by ID
  const handleDeleteColumn = (columnId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this column? All tasks will be lost!"
    );
    if (confirmDelete) {
      setColumns((prevColumns) =>
        prevColumns.filter((column) => column.id !== columnId)
      );
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            // setColumns={setColumns}
            handleAddTask={handleAddTask}
            handleRemoveTask={handleRemoveTask}
            handleDeleteColumn={handleDeleteColumn}
            handleMoveTask={handleMoveTask}
          />
        ))}
        {/* Button to add new column */}
        <button onClick={handleAddColumn}>Add New Column</button>
      </div>
    </DndProvider>
  );
};

export default Board;
