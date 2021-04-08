import React from 'react';
import Item from './Item';
import type { ItemType } from '../App';

function DoneTasks({
  donetasks,
}: {
  donetasks: Array<ItemType>;
}): React.ReactElement {
  return (
    <div>
      <ul>
        {donetasks.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default DoneTasks;
