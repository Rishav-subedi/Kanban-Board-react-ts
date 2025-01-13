// types.ts

export interface TaskType {
  id: number;
  name: string;
}

export interface ColumnType {
  id: number;
  name: string;
  tasks: TaskType[];
}
