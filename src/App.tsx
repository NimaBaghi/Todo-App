import React from 'react';
import './App.css';
import uuid from 'uuid';
import AddTask from './components/AddTask';
import Item from './components/Item';

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

  function handleDelete(taskId: string): void {
    const newList = list.filter((i) => i.id !== taskId);

    setList(newList);
  }

  return (
    <div className="App">
      <AddTask task={task} onChange={handleChange} onAdd={handleAdd} />
      <ul>
        {list.map((item) => (
          <Item key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

export default App;
