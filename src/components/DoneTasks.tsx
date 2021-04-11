import React from 'react';
import Item from './Item';
import type { ItemType } from '../App';

function DoneTasks({
  donetasks,
}: {
  donetasks: Array<ItemType>;
}): React.ReactElement {
  return (
    <div className="mt-5">
      <table className="w-full ml-auto table-fixed">
        <tr>
          <th className="w-2/6 font-normal text-left text-gray-500">Tasks</th>
          <th className="w-1/6 font-normal text-left text-gray-500">Status</th>
          <th className="w-2/6 font-normal text-left text-gray-500">Date</th>
          <th className="w-1/6 font-normal text-left text-gray-500">Time</th>
        </tr>
        {donetasks.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </table>
    </div>
  );
}

export default DoneTasks;
