import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function AddTask({
  task,
  onChange,
  onAdd,
}: {
  task: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onAdd(event: React.FormEvent, item: string): void;
}): React.ReactElement {
  return (
    <Popup
      trigger={<button type="button">Add Task</button>}
      position="right center"
    >
      <form onSubmit={(event): void => onAdd(event, task)}>
        <label htmlFor="task">
          New Task:
          <input
            type="text"
            name="task"
            id="task"
            style={{ border: '2px solid gray' }}
            value={task}
            onChange={onChange}
            required
          />
        </label>
        <input type="submit" value="Add Task" />
      </form>
    </Popup>
  );
}

export default AddTask;
