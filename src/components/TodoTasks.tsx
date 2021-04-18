import React from 'react';
import type { ItemType } from '../App';
import Item from './Item';

function TodoTasks({
  todotasks,
  onDelete,
  onDone,
  onSort,
  onEdit,
}: {
  todotasks: Array<ItemType>;
  onDelete(id: string): void;
  onDone(item: ItemType): void;
  onSort(): void;
  onEdit(event: React.FormEvent, item: ItemType, newTaskName: string): void;
}): React.ReactElement {
  return (
    <div>
      <table className="w-full table-fixed">
        <thead>
          <tr className="h-10 border-t border-b border-gray-200">
            <th className="w-1/12" />
            <th
              onClick={onSort}
              className="w-3/12 font-normal text-left text-gray-500 cursor-pointer"
            >
              Tasks
            </th>
            <th className="w-2/12 font-normal text-left text-gray-500">
              Status
            </th>
            <th className="w-2/12 font-normal text-left text-gray-500">Date</th>
            <th className="w-2/12 font-normal text-left text-gray-500">Time</th>
            <th className="w-2/12" />
          </tr>
        </thead>

        {todotasks
          .filter((i) => i.done === false)
          .map((item) => (
            <Item
              key={item.id}
              item={item}
              onDelete={onDelete}
              onDone={onDone}
              onEdit={onEdit}
            />
          ))}
      </table>
    </div>
  );
}

export default TodoTasks;
