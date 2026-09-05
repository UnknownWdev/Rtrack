import { useState, useEffect } from 'react';

function App() {
  // 1. Initialise state from localStorage, fallback to default tasks if empty
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tracked_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { id: 1, text: "Master HTML/CSS" },
      { id: 2, text: "Learn React State" }
    ];
  });
  
  const [input, setInput] = useState("");

  // 2. Sync tasks state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tracked_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTask = { id: Date.now(), text: input.trim() };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (idToDelete) => {
    setTasks(tasks.filter((task) => task.id !== idToDelete));
  };

  return (
    <div className="task-container">
      <h2>Day 35 Task Tracker ⚡</h2>
      <form className="input-group" onSubmit={addTask}>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="New task..." 
        />
        <button type="submit">Add</button>
      </form>
      
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button 
              className="delete-btn" 
              onClick={() => deleteTask(task.id)} 
              style={{ marginLeft: '10px', color: 'red' }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
