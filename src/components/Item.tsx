import React from 'react';
import type { ItemType } from '../App';

interface OptionalHandlers {
  item: ItemType;
  onDelete?: (id: string) => void;
  onDone?: (item: ItemType) => void;
}

Item.defaultProps = {
  onDelete: undefined,
  onDone: undefined,
};

function Item({
  item,
  onDelete,
  onDone,
}: OptionalHandlers): React.ReactElement {
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

  if (onDelete && onDone) {
    return (
      <tr className="h-24 pt-8 border-b border-gray-200">
        <td className="col-span-2 text-2xl leading-loose text-left text-gray-900">
          {item.task}{' '}
        </td>
        <td className="text-left">
          <span className={getStatusClasses()}>{item.status}</span>
        </td>
        <td className="text-left">{itemDate}</td>
        <td className="text-left">{itemTime}</td>
        <td className="text-left border-none">
          <button
            className="h-10 px-5 m-2 rounded-full focus:shadow-outline hover:bg-red-100 focus:outline-none"
            type="button"
            onClick={(): void => onDelete(item.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z" />
            </svg>
          </button>
          <button
            className="h-10 px-5 m-2 rounded-full focus:shadow-outline hover:bg-green-100 focus:outline-none"
            type="button"
            onClick={(): void => onDone(item)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
            </svg>
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr className="h-24 border border-gray-200">
      <td className="mt-6 text-2xl leading-loose text-left text-gray-900">
        {item.task}
      </td>
      <td className="text-left">
        <span className={getStatusClasses()}>{item.status}</span>
      </td>
      <td className="text-left">{itemDate}</td>
      <td className="text-left">{itemTime}</td>
    </tr>
  );
}

export default Item;
