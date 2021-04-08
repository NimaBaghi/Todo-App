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
  if (onDelete && onDone) {
    return (
      <div>
        {item.id} {item.task} {item.status} {item.date.getTime()}
        <button
          className="ml-4 bg-gray-400"
          type="button"
          onClick={(): void => onDelete(item.id)}
        >
          Delete
        </button>
        <button
          className="ml-4 bg-gray-400"
          type="button"
          onClick={(): void => onDone(item)}
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div>
      {item.id} {item.task} {item.status} {item.date.getTime()}
    </div>
  );
}

export default Item;
