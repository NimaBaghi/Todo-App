import React from 'react';
import type { ItemType } from '../App';
import AddTask from './AddTask';
import Item from './Item';

function TodoTasks({
  todotasks,
  onAdd,
  onChange,
  onDelete,
  onDone,
  task,
}: {
  todotasks: Array<ItemType>;
  onAdd(event: React.FormEvent, item: string): void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onDelete(id: string): void;
  onDone(item: ItemType): void;
  task: string;
}): React.ReactElement {
  return (
    <div>
      <AddTask task={task} onChange={onChange} onAdd={onAdd} />
      <table className="w-full table-fixed">
        <tr className="border border-gray-200">
          <th className="w-2/6 font-normal text-left text-gray-500">Tasks</th>
          <th className="w-1/6 font-normal text-left text-gray-500">Status</th>
          <th className="w-1/6 font-normal text-left text-gray-500">Date</th>
          <th className="w-1/6 font-normal text-left text-gray-500">Time</th>
          <th className="w-1/6" />
        </tr>

        {todotasks
          .filter((i) => i.done === false)
          .map((item) => (
            <Item
              key={item.id}
              item={item}
              onDelete={onDelete}
              onDone={onDone}
            />
          ))}
      </table>
    </div>
  );
}

export default TodoTasks;
