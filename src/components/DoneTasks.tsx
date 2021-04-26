import React, { memo } from 'react';
import Item from './Item';
import type { ItemType } from '../App';

function DoneTasks({
  donetasks,
  onSort,
}: {
  donetasks: Array<ItemType>;
  onSort(): void;
}): React.ReactElement {
  return (
    <div className="mt-5">
      <table className="w-full table-fixed">
        <thead>
          <tr className="h-10 border-t border-b border-gray-200">
            <th
              onClick={onSort}
              className="w-2/6 font-normal text-left text-gray-500 cursor-pointer"
            >
              Tasks
            </th>
            <th className="w-1/6 font-normal text-left text-gray-500">
              Status
            </th>
            <th className="w-2/6 font-normal text-left text-gray-500">Date</th>
            <th className="w-1/6 font-normal text-left text-gray-500">Time</th>
          </tr>
        </thead>
        {donetasks.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </table>
    </div>
  );
}

export default memo(DoneTasks);
