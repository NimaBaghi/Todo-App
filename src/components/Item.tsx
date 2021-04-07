import React from 'react';

function Item({
  item,
  onDelete,
}: {
  item: {
    id: string;
    task: string;
    status: string;
    date: Date;
  };
  onDelete(id: string): void;
}): React.ReactElement {
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
    </div>
  );
}

export default Item;
