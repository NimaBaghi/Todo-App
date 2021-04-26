import React, { useCallback, useState, useEffect } from 'react';
import uuid from 'uuid';
import TodoTasks from './components/TodoTasks';
import DoneTasks from './components/DoneTasks';
import AddTask from './components/AddTask';

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
    task: 'todo 1',
    status: 'Complete',
    date: new Date(),
    done: true,
  },
  {
    id: '2',
    task: 'todo 2',
    status: 'In Progress',
    date: new Date('2021-04-10'),
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
  {
    id: '5',
    task: 'todo 5',
    status: 'In Progress',
    date: new Date('2021-04-08'),
    done: false,
  },
  {
    id: '6',
    task: 'todo 6',
    status: 'In Progress',
    date: new Date('2021-04-01'),
    done: false,
  },
];

function App(): React.ReactElement {
  const [list, setList] = useState(initialState);
  const [task, setTask] = useState('');
  const [currentPage, setCurrentPage] = useState('Todo');
  const [filterDate, setFilterDate] = useState('');
  const [filterList, setFilterList] = useState(initialState);
  const [isSorted, setSorted] = useState(false);

  useEffect(() => {
    const storedList = localStorage.getItem('taskList');
    const initList = storedList ? JSON.parse(storedList) : initialState;
    for (let i = 0; i < initList.length; i += 1) {
      initList[i].date = new Date(initList[i].date);
    }
    setList(initList);
    setFilterList(initList);
  }, []);

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(list));
  }, [list]);

  const handleEdit = useCallback(
    (event: React.FormEvent, item: ItemType, newTaskName: string): void => {
      event.preventDefault();

      setFilterList((prevFilterList) => {
        const newList = [...prevFilterList];
        const filterListIndex = newList.indexOf(item);
        newList[filterListIndex] = { ...item };
        newList[filterListIndex].task = newTaskName;
        return newList;
      });

      setList((prevList) => {
        const newList = [...prevList];
        const listIndex = newList.indexOf(item);
        newList[listIndex] = { ...item };
        newList[listIndex].task = newTaskName;
        return newList;
      });
    },
    [],
  );

  const handleAdd = useCallback(
    (event: React.FormEvent, item: string): void => {
      event.preventDefault();

      setList((prevList) => {
        return [
          ...prevList,
          {
            id: uuid.v4(),
            task: item,
            status: 'In Progress',
            date: new Date(),
            done: false,
          },
        ];
      });

      setFilterList((prevFilterList) => {
        return [
          ...prevFilterList,
          {
            id: uuid.v4(),
            task: item,
            status: 'In Progress',
            date: new Date(),
            done: false,
          },
        ];
      });

      setTask('');
    },
    [],
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      setTask(event.target.value);
    },
    [],
  );

  const handleDelete = useCallback((taskId: string): void => {
    setFilterList((prevFilterList) => {
      return prevFilterList.filter((i) => i.id !== taskId);
    });

    setList((prevList) => {
      return prevList.filter((i) => i.id !== taskId);
    });
  }, []);

  const handleDone = useCallback((item: ItemType): void => {
    setFilterList((prevFilterList) => {
      const newList = [...prevFilterList];
      const filterListIndex = newList.indexOf(item);
      newList[filterListIndex] = { ...item };
      newList[filterListIndex].done = true;
      newList[filterListIndex].status = 'Complete';
      return newList;
    });

    setList((prevList) => {
      const newList = [...prevList];
      const listIndex = newList.indexOf(item);
      newList[listIndex] = { ...item };
      newList[listIndex].done = true;
      newList[listIndex].status = 'Complete';
      return newList;
    });
  }, []);

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

  const handleSort = useCallback((): void => {
    setFilterList((prevFilterList) => {
      const newlist = [...prevFilterList];
      if (!isSorted) {
        newlist.sort(compare);
        setSorted(true);
      } else {
        newlist.sort(reverseCompare);
        setSorted(false);
      }
      return newlist;
    });
  }, [isSorted]);

  function showTodoPage(): void {
    const page = 'Todo';
    setCurrentPage(page);
  }

  function showDonePage(): void {
    const page = 'Done';
    setCurrentPage(page);
  }

  function filterDateByOption(filterBy: string): void {
    if (filterBy === 'Day') {
      const newList = list.filter(
        (i) => i.date.getDay() === new Date().getDay(),
      );
      setFilterList(newList);
    } else if (filterBy === 'Week') {
      const oneDay = 24 * 60 * 60 * 1000;
      const today = new Date();
      const newList = list.filter(
        (i) =>
          Math.round(Math.abs((today.getTime() - i.date.getTime()) / oneDay)) <
          7,
      );
      setFilterList(newList);
    } else {
      const newList = list.filter(
        (i) => i.date.getMonth() === new Date().getMonth(),
      );
      setFilterList(newList);
    }
    setFilterDate(filterBy);
  }

  return (
    <div className="flex flex-col App">
      <div className="flex justify-end -mb-8">
        <AddTask task={task} onChange={handleChange} onAdd={handleAdd} />
      </div>
      <div>
        <button
          type="button"
          className={`p-2 bg-white border-t border-l border-r border-gray-300 focus:outline-none ${
            currentPage === 'Todo'
              ? 'text-blue-700 font-bold pointer-events-none'
              : 'text-gray-400 bg-gray-300'
          }`}
          onClick={showTodoPage}
        >
          To Do
        </button>
        <button
          type="button"
          className={`p-2 ml-2 bg-white border-t border-l border-r border-gray-300 focus:outline-none ${
            currentPage === 'Done'
              ? 'text-blue-700 font-bold pointer-events-none'
              : 'text-gray-400 bg-gray-300'
          }`}
          onClick={showDonePage}
        >
          Done Tasks
        </button>
        <hr />
      </div>

      <div className="h-full p-4 my-5">
        <div className="flex justify-end">
          <div className="flex rounded-md shadow-sm">
            <button
              type="button"
              onClick={(): void => filterDateByOption('Month')}
              className={`px-4 py-2 text-sm font-medium leading-5  bg-white border border-gray-300 rounded-l-md focus:outline-none ${
                filterDate === 'Month'
                  ? 'text-blue-600 hover:text-blue-500 pointer-events-none'
                  : 'text-gray-700 hover:text-gray-500'
              }`}
            >
              Month
            </button>
            <button
              type="button"
              onClick={(): void => filterDateByOption('Week')}
              className={`px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 hover:text-gray-500 focus:outline-none ${
                filterDate === 'Week'
                  ? 'text-blue-600 hover:text-blue-500 pointer-events-none'
                  : 'text-gray-700 hover:text-gray-500'
              }`}
            >
              Week
            </button>
            <button
              onClick={(): void => filterDateByOption('Day')}
              type="button"
              className={`px-4 py-2 -ml-px text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-r-md hover:text-gray-500 focus:outline-none ${
                filterDate === 'Day'
                  ? 'text-blue-600 hover:text-blue-500 pointer-events-none'
                  : 'text-gray-700 hover:text-gray-500'
              }`}
            >
              Day
            </button>
          </div>
        </div>
      </div>

      <div>
        {currentPage === 'Todo' ? (
          <TodoTasks
            todotasks={filterList}
            onDelete={handleDelete}
            onDone={handleDone}
            onSort={handleSort}
            onEdit={handleEdit}
          />
        ) : (
          <DoneTasks
            donetasks={filterList.filter((i) => i.done === true)}
            onSort={handleSort}
          />
        )}
      </div>
    </div>
  );
}

export default App;
