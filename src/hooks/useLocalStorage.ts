import useLocalStorageState from "use-local-storage-state";

const Board = () => {
  const [columns, setColumns] = useLocalStorageState("columns", {
    defaultValue: [
      { id: 1, name: "Todo", tasks: [] },
      { id: 2, name: "In Progress", tasks: [] },
      { id: 3, name: "Done", tasks: [] },
    ],
  });

  // same code as above for handling drag-and-drop
};
