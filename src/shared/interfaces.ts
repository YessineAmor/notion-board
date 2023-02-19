export interface Task {
  id: number;
  equipment: string;
}

export interface TaskItemProps {
  item: Task;
  dragOverTask: number;
  setDragOverTask: React.Dispatch<React.SetStateAction<number>>;
  data: Task[];
  name: string;
}
