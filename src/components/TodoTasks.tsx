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
      <ul>
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
      </ul>
    </div>
  );
}

export default TodoTasks;
