import React from 'react';
import { TaskItemProps } from '../../shared/interfaces';

const TaskItem = ({
  item,
  dragOverTask,
  setDragOverTask,
  data,
  name,
}: TaskItemProps) => {
  return (
    <div
      id={name}
      className={
        `w-full p-2 bg-white text-black border-white border-[1px] rounded-md cursor-pointer shadow-md hover:opacity-75` +
        (dragOverTask === item.id ? ' border-t-indigo-500 border-t-2' : '')
      }
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(
          'text/plain',
          JSON.stringify({
            item,
            originData: data,
            originName: name,
          })
        );
        e.dataTransfer.effectAllowed = 'move';
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOverTask(item.id);
      }}
    >
      <h3>Buy {item.equipment}</h3>
    </div>
  );
};

export default TaskItem;
