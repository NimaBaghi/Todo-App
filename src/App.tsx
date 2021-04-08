import React from 'react';
import './App.css';
import uuid from 'uuid';
import TodoTasks from './components/TodoTasks';
import DoneTasks from './components/DoneTasks';

export type ItemType = {
  id: string;
  task: string;
  status: string;
  date: Date;
  done: boolean;
};

const initialState: Array<ItemType> = [
  {
    id: '1',
    task: 'Todo 1',
    status: 'Complete',
    date: new Date(),
    done: false,
  },
  {
    id: '2',
    task: 'Todo 2',
    status: 'In Progress',
    date: new Date('2020-01-16'),
    done: false,
  },
  { id: '3', task: 'Todo 3', status: 'Paused', date: new Date(), done: true },
  {
    id: '4',
    task: 'Todo 4',
    status: 'Complete',
    date: new Date(),
    done: false,
  },
];

function App(): React.ReactElement {
  const [list, setList] = React.useState(initialState);
  const [task, setTask] = React.useState('');

  function handleAdd(event: React.FormEvent, item: string): void {
    event.preventDefault();
    const newList = [
      ...list,
      {
        id: uuid.v4(),
        task: item,
        status: 'In Progress',
        date: new Date(),
        done: false,
      },
    ];

    setList(newList);

    setTask('');
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setTask(event.target.value);
  }

  function handleDelete(taskId: string): void {
    const newList = list.filter((i) => i.id !== taskId);

    setList(newList);
  }

  function handleDone(item: ItemType): void {
    const newList = [...list];
    const index = newList.indexOf(item);
    newList[index] = { ...item };
    newList[index].done = true;
    setList(newList);
  }

  return (
    <div className="App">
      <TodoTasks
        todotasks={list}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onChange={handleChange}
        onDone={handleDone}
        task={task}
      />
      <hr className="mt-5 mb-5" />
      <DoneTasks donetasks={list.filter((i) => i.done === true)} />
    </div>
  );
}

export default App;
