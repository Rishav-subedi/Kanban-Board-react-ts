import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import { ColumnType, TaskType } from "../interface/types";
import useLocalStorageState from "use-local-storage-state";
import {
  addTaskToColumn,
  removeTaskFromColumn,
  addColumn,
  deleteColumn,
  moveColumn,
} from "../utils/columnUtility";
import { moveTaskInColumn, moveTaskAcrossColumns } from "../utils/taskUtility";
import Search from "./SearchBar";
import { Button, Typography } from "@mui/material";

const Board = () => {
  const [columns, setColumns] = useLocalStorageState<ColumnType[]>("columns", {
    defaultValue: [{ id: 1, name: "Todo", tasks: [] }],
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleAddTask = (columnId: number, task: TaskType) => {
    setColumns((prevColumns) => addTaskToColumn(prevColumns, columnId, task));
  };

  const handleRemoveTask = (task: TaskType, columnId: number) => {
    setColumns((prevColumns) =>
      removeTaskFromColumn(prevColumns, columnId, task.id)
    );
  };

  const handleAddColumn = () => {
    const newColumnName = prompt("Enter new column name:", "New Column");
    if (newColumnName) {
      setColumns((prevColumns) => addColumn(prevColumns, newColumnName));
    }
  };

  const handleDeleteColumn = (columnId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this column?"
    );
    if (confirmDelete) {
      setColumns((prevColumns) => deleteColumn(prevColumns, columnId));
    }
  };

  const handleMoveTask = (
    taskId: number,
    direction: string,
    columnId: number
  ) => {
    setColumns((prevColumns) =>
      moveTaskInColumn(prevColumns, columnId, taskId, direction)
    );
  };

  const handleMoveTaskAcrossColumns = (
    taskId: number,
    sourceColumnId: number,
    targetColumnId: number
  ) => {
    setColumns((prevColumns) =>
      moveTaskAcrossColumns(prevColumns, sourceColumnId, targetColumnId, taskId)
    );
  };

  const handleMoveColumn = (columnId: number, direction: "left" | "right") => {
    setColumns((prevColumns) => moveColumn(prevColumns, columnId, direction));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };
  columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter((task) =>
      task.name.toLowerCase().includes(searchQuery)
    ),
  }))

  const filteredColumns =
    searchQuery.trim() === ""
      ? columns
      : columns.filter((column) =>
          column.tasks.some((task) =>
            task.name.toLowerCase().includes(searchQuery.toLowerCase())
          )).map((column) => ({
            ...column,
            tasks: column.tasks.filter((task) =>
              task.name.toLowerCase().includes(searchQuery)
            ),
          }))

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="main-container">
        {/* Search Bar */}
        <div className="search-container">
          <Search onSearch={handleSearch} />
        </div>
        {/* Add New Column Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddColumn}
          style={{ marginBottom: "20px" }}
        >
          + Add New Column
        </Button>
        {/* Fallback UI for Empty Board */}
        {columns.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            There are currently no List for the user.
          </Typography>
        )}

        {/* Fallback UI for No Matches */}
        {columns.length > 0 && filteredColumns.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            No Tasks Found.
          </Typography>
        )}
        {/* Columns */}
        <div className="columns-container">
          {filteredColumns.map((column) => (
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
        </div>
      </div>
    </DndProvider>
  );
};

export default Board;
