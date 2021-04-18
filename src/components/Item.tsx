import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import type { ItemType } from '../App';
import 'reactjs-popup/dist/index.css';

interface OptionalHandlers {
  item: ItemType;
  onDelete?: (id: string) => void;
  onDone?: (item: ItemType) => void;
  onEdit?: (
    event: React.FormEvent,
    item: ItemType,
    newTaskName: string,
  ) => void;
}

Item.defaultProps = {
  onDelete: undefined,
  onDone: undefined,
  onEdit: undefined,
};

function Item({
  item,
  onDelete,
  onDone,
  onEdit,
}: OptionalHandlers): React.ReactElement {
  const [newTaskName, setNewTaskName] = useState(item.task);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = monthNames[item.date.getMonth()];
  const itemDate = `${item.date.getDate()} ${month} ${item.date.getFullYear()}`;
  const itemTime = `${item.date.getHours() % 12}:${item.date.getMinutes()} ${
    item.date.getHours() > 12 ? 'pm' : 'am'
  }`;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewTaskName(event.target.value);
  }

  function getStatusClasses(): string {
    let classes = 'text-white font-bold p-2 rounded-xl bg-';
    if (item.status === 'In Progress') {
      classes += 'blue-500';
    } else if (item.status === 'Paused') {
      classes += 'yellow-500';
    } else {
      classes += 'green-400';
    }
    return classes;
  }

  if (onDelete && onDone && onEdit) {
    return (
      <tbody>
        <tr className="h-24 pt-8 border-b border-gray-200">
          <td>
            <input
              className="ml-5"
              type="checkbox"
              onClick={(): void => onDone(item)}
            />
          </td>
          <td className="col-span-2 text-2xl leading-loose text-left text-gray-900">
            {item.task}{' '}
          </td>
          <td className="text-left">
            <span className={getStatusClasses()}>{item.status}</span>
          </td>
          <td className="text-left">{itemDate}</td>
          <td className="text-left">{itemTime}</td>
          <td className="text-right border-none ">
            <Popup
              trigger={
                <button
                  className="h-10 px-3 m-1 rounded-full focus:shadow-outline hover:bg-green-100 focus:outline-none"
                  type="button"
                >
                  <svg
                    className="w-6 h-6 text-blue-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              }
              position="bottom center"
            >
              <div className="inline-block text-left align-bottom bg-white rounded-lg shadow-xl sm:align-middle sm:max-w-lg">
                <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <form
                      className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                      onSubmit={(event): void =>
                        onEdit(event, item, newTaskName)
                      }
                    >
                      <label
                        htmlFor="task"
                        className="text-lg font-medium leading-6 text-gray-900 "
                      >
                        Edit Task
                        <input
                          className="mt-5 text-gray-600 border-2 border-gray-300 rounded-lg outline-none"
                          type="text"
                          name="task"
                          id="task"
                          placeholder="Fix my desk"
                          value={newTaskName}
                          onChange={handleChange}
                          required
                        />
                      </label>
                      <div className="py-3 ml-4 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          Edit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Popup>
            <button
              className="h-10 px-3 m-1 rounded-full mr-9 focus:shadow-outline hover:bg-red-100 focus:outline-none"
              type="button"
              onClick={(): void => onDelete(item.id)}
            >
              <svg
                className="w-6 h-6 text-red-500"
                fill="currentColor"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      <tr className="h-24 border-b border-gray-200">
        <td className="mt-6 text-2xl leading-loose text-left text-gray-900">
          {item.task}
        </td>
        <td className="text-left">
          <span className={getStatusClasses()}>{item.status}</span>
        </td>
        <td className="text-left">{itemDate}</td>
        <td className="text-left">{itemTime}</td>
      </tr>
    </tbody>
  );
}

export default Item;
