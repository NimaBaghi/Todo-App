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

let isSorted = false;
const initialSortButtonText = 'Sort';

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
  const [sortButtonName, setSortButton] = React.useState(initialSortButtonText);

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

  function compare(a: ItemType, b: ItemType): number {
    if (a.task < b.task) {
      return -1;
    }
    if (a.task > b.task) {
      return 1;
    }
    return 0;
  }

  function reverseCompare(a: ItemType, b: ItemType): number {
    if (a.task < b.task) {
      return 1;
    }
    if (a.task > b.task) {
      return -1;
    }
    return 0;
  }

  function sortList(): void {
    const newlist = [...list];
    let newSortButtonName = 'Sort';
    if (!isSorted) {
      newlist.sort(compare);
      isSorted = true;
      newSortButtonName = 'A->Z';
    } else {
      newlist.sort(reverseCompare);
      isSorted = false;
      newSortButtonName = 'Z->A';
    }
    setSortButton(newSortButtonName);
    setList(newlist);
  }

  return (
    <div className="App">
      <button type="button" className="m-5 bg-gray-600" onClick={sortList}>
        {sortButtonName}
      </button>
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
