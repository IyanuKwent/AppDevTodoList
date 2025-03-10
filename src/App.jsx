import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]); // Ensure tasks is an array

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  return (
    <div className="app-container">
      <div className={`sidebar ${tasks.length === 0 ? "centered" : ""}`}>
        <h1>Olandria's TODO App</h1>
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="add-task" onClick={addTask}>Add Task</button>
      </div>

      {tasks.length > 0 ? (
        <TodoList tasks={tasks} setTasks={setTasks} />
      ) : (
        <p style={{ textAlign: "center", width: "100%" }}>No tasks yet.</p>
      )}
    </div>
  );
}

export default App;
