import { useEffect, useState } from 'react';
import { Task } from '../shared/interfaces';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);

  useEffect(() => {
    // fetch tasks
    async function fetchTasks() {
      const response = await fetch(
        'https://random-data-api.com/api/v2/appliances?size=5'
      );
      const data = await response.json();
      setTasks(data);
      return data;
    }

    fetchTasks();
  }, []);

  return tasks;
};
