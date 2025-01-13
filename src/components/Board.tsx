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


  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        {columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            setColumns={setColumns}
            handleAddTask={handleAddTask}
            handleRemoveTask={handleRemoveTask}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default Board;
