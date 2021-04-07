import React from 'react';
import './App.css';
import uuid from 'uuid';
import AddTask from './components/AddTask';

const initialState: Array<{
  id: string;
  task: string;
  status: string;
  date: Date;
}> = [
  { id: '1', task: 'Todo 1', status: 'Complete', date: new Date() },
  {
    id: '2',
    task: 'Todo 2',
    status: 'In Progress',
    date: new Date('2020-01-16'),
  },
  { id: '3', task: 'Todo 3', status: 'Paused', date: new Date() },
  { id: '4', task: 'Todo 4', status: 'Complete', date: new Date() },
];

function App(): React.ReactElement {
  const [list, setList] = React.useState(initialState);
  const [task, setTask] = React.useState('');

  function handleAdd(event: React.FormEvent): void {
    event.preventDefault();
    const newList = list.concat({
      id: uuid.v4(),
      task,
      status: 'In Progress',
      date: new Date(),
    });

    setList(newList);

    setTask('');
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setTask(event.target.value);
  }

  return (
    <div className="App">
      <AddTask task={task} onChange={handleChange} onAdd={handleAdd} />
      {/* <form onSubmit={handleAdd}>
        <input
          type="text"
          style={{ border: '2px solid gray' }}
          value={task}
          onChange={handleChange}
          required
        />
        <input type="submit" value="Add Task" />
      </form> */}
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            {item.id} {item.task} {item.status} {item.date.getTime()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
