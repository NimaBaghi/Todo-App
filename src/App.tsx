import React from 'react';
import './App.css';

function App(): React.ReactElement {
  const items: Array<{
    id: number;
    task: string;
    status: string;
    date: Date;
  }> = [
    { id: 1, task: 'Todo 1', status: 'Complete', date: new Date() },
    {
      id: 1,
      task: 'Todo 2',
      status: 'In Progress',
      date: new Date('2020-01-16'),
    },
    { id: 3, task: 'Todo 3', status: 'Paused', date: new Date() },
    { id: 4, task: 'Todo 4', status: 'Complete', date: new Date() },
  ];

  // const [items, setitems] = useState(0);

  return (
    <div className="App">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.task} {item.status} {item.date.getTime()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
