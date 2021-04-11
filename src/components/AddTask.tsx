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
      trigger={
        <button
          className="h-10 px-5 m-2 text-blue-100 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
          type="button"
        >
          Add Task
        </button>
      }
      position="right center"
    >
      <div className="inline-block text-left align-bottom bg-white rounded-lg shadow-xl sm:align-middle sm:max-w-lg">
        <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <form
              className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
              onSubmit={(event): void => onAdd(event, task)}
            >
              <label
                htmlFor="task"
                className="text-lg font-medium leading-6 text-gray-900 "
              >
                New Task
                <input
                  className="mt-5 text-gray-600 border-2 border-gray-300 rounded-lg outline-none"
                  type="text"
                  name="task"
                  id="task"
                  placeholder="Fix my desk"
                  value={task}
                  onChange={onChange}
                  required
                />
              </label>
              <div className="py-3 ml-4 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add a task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default AddTask;
