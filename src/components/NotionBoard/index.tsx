import React, { DragEvent, useEffect, useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Task } from '../../shared/interfaces';
import Header from './Header';
import TaskItem from './Task';

const NotionBoard = () => {
  const tasks = useTasks();

  const [todoData, setTodoData] = useState<Task[]>([]);
  const [progressData, setProgressData] = useState<Task[]>([]);
  const [reviewData, setReviewData] = useState<Task[]>([]);
  const [doneData, setDoneData] = useState<Task[]>([]);

  useEffect(() => {
    if (tasks && tasks.length > 0 && todoData?.length === 0) {
      setTodoData(tasks);
    }
  }, [tasks]);

  const DATA = [
    {
      id: 1,
      name: 'TODO',
      data: todoData,
      setter: setTodoData,
    },
    {
      id: 2,
      name: 'PROGRESS',
      data: progressData,
      setter: setProgressData,
    },
    {
      id: 3,
      name: 'IN REVIEW',
      data: reviewData,
      setter: setReviewData,
    },
    {
      id: 4,
      name: 'DONE',
      data: doneData,
      setter: setDoneData,
    },
  ];

  const getSetterByName = (name: string) => {
    const data = DATA.find((item) => item.name === name);
    return data?.setter;
  };

  const [dragOverTask, setDragOverTask] = useState<number>(0);

  const onDrop = (
    e: DragEvent,
    data: Task[],
    setter: React.Dispatch<React.SetStateAction<Task[]>>
  ) => {
    setDragOverTask(0);
    // console.log('onDrop dropped', e);
    const dataTransferData = e.dataTransfer.getData('text/plain');

    const {
      originData,
      originName,
    }: {
      originData: Task[];
      originName: string;
    } = JSON.parse(dataTransferData);

    const originSetter = getSetterByName(originName);

    let newTasks = [...data, JSON.parse(dataTransferData).item];

    let indexToInsertInto: number;

    if (
      dragOverTask !== 0 &&
      JSON.parse(dataTransferData).item.id !== dragOverTask
    ) {
      indexToInsertInto = newTasks.findIndex(
        (item) => item.id === dragOverTask
      );
      newTasks.splice(indexToInsertInto, 0, JSON.parse(dataTransferData).item);
      newTasks.pop();
    }

    setter(newTasks);

    // Handle case where data is dropped back to the same column
    if (setter == originSetter) {
      // Remove moved item from the array which lies at the old index
      const duplicateToRemove = newTasks.findIndex(
        (item, index) =>
          item.id === JSON.parse(dataTransferData).item.id &&
          index !== indexToInsertInto
      );
      newTasks.splice(duplicateToRemove, 1);
      setter(newTasks);
      return;
    }

    if (!originSetter) throw new Error('originSetter is undefined');

    originSetter(
      originData.filter(
        (item: Task) => item.id !== JSON.parse(dataTransferData).item.id
      )
    );
  };

  return (
    <div className='p-10'>
      <Header />
      <div className='flex flex-col md:flex-row gap-2 justify-around items-center md:items-start overflow-auto'>
        {DATA.map(({ data, setter, name }) => {
          return (
            <div key={name}>
              <h2 className='text-2xl font-medium p-5'>{name}</h2>
              <div
                className='flex flex-col gap-2 items-center bg-slate-400 p-4 rounded-md w-64'
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                }}
                onDrop={(e) => onDrop(e, data, setter)}
              >
                {data.map((item) => {
                  return (
                    <TaskItem
                      item={item}
                      data={data}
                      dragOverTask={dragOverTask}
                      setDragOverTask={setDragOverTask}
                      name={name}
                    />
                  );
                })}
                {data.length === 0 && 'Drag & Drop tasks here...'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotionBoard;
