import React from 'react';
// import './index.css';
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
    task: 'todo 1',
    status: 'Complete',
    date: new Date(),
    done: true,
  },
  {
    id: '2',
    task: 'todo 2',
    status: 'In Progress',
    date: new Date('2020-01-16'),
    done: false,
  },
  { id: '3', task: 'todo 3', status: 'Paused', date: new Date(), done: false },
  {
    id: '4',
    task: 'todo 4',
    status: 'Complete',
    date: new Date(),
    done: true,
  },
];

function App(): React.ReactElement {
  const [list, setList] = React.useState(initialState);
  const [task, setTask] = React.useState('');
  const [sortButtonName, setSortButton] = React.useState(initialSortButtonText);
  const [currentPage, setCurrentPage] = React.useState('Todo');

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
    newList[index].status = 'Complete';
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

  function showTodoPage(): void {
    const page = 'Todo';
    setCurrentPage(page);
  }

  function showDonePage(): void {
    const page = 'Done';
    setCurrentPage(page);
  }
  function getButtonClasses(buttonName: string): string {
    let classes = '';
    if (currentPage === 'Todo' && buttonName === 'Todo') {
      classes +=
        'p-2 bg-white border-t border-l border-r border-gray-300 font-bold text-blue-700 pointer-events-none focus:outline-none';
    } else if (currentPage === 'Todo' && buttonName === 'Done') {
      classes +=
        'p-2 ml-2 border-t border-l border-r border-gray-300 text-gray-400 bg-gray-300 focus:outline-none';
    } else if (currentPage === 'Done' && buttonName === 'Done') {
      classes +=
        'p-2 ml-2 bg-white border-t border-l border-r border-gray-300 font-bold text-blue-700 pointer-events-none focus:outline-none';
    } else if (currentPage === 'Done' && buttonName === 'Todo') {
      classes +=
        'p-2 border-t border-l border-r border-gray-300 text-gray-400 bg-gray-300 focus:outline-none';
    }
    return classes;
  }

  return (
    <div className="flex flex-col App">
      <div>
        <button
          type="button"
          className={getButtonClasses('Todo')}
          onClick={showTodoPage}
        >
          To Do
        </button>
        <button
          type="button"
          className={getButtonClasses('Done')}
          onClick={showDonePage}
        >
          Done Tasks
        </button>
      </div>
      <button
        type="button"
        className="h-10 px-5 m-auto text-gray-100 bg-gray-700 rounded-lg focus:outline-none hover:bg-gray-800"
        onClick={sortList}
      >
        {sortButtonName}
      </button>

      <div>
        {currentPage === 'Todo' ? (
          <TodoTasks
            todotasks={list}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onChange={handleChange}
            onDone={handleDone}
            task={task}
          />
        ) : (
          <DoneTasks donetasks={list.filter((i) => i.done === true)} />
        )}
      </div>
    </div>
  );
}

export default App;
