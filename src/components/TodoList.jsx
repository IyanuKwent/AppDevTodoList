import { useState } from "react";

export default function TodoList({ tasks, setTasks }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    if (editIndex !== index) {
      setTasks(
        tasks.map((t, i) =>
          i === index ? { ...t, completed: !t.completed } : t
        )
      );
    }
  };

  const startEdit = (index, text) => {
    setEditIndex(index);
    setEditText(text);
  };

  const saveEdit = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editIndex].text = editText;
    setTasks(updatedTasks);
    setEditIndex(null);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="task-container">
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map((t, index) => (
          <li
            key={index}
            className={t.completed ? "completed" : ""}
            onClick={() => toggleComplete(index)} 
          >
            {editIndex === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span>{t.text}</span>
            )}

            { }
            <div className="task-buttons">
              {editIndex === index ? (
                <button
                  onClick={(e) => {
                    stopPropagation(e); 
                    saveEdit();
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    stopPropagation(e); 
                    startEdit(index, t.text);
                  }}
                >
                  Edit
                </button>
              )}

              <button
                onClick={(e) => {
                  stopPropagation(e); 
                  removeTask(index);
                }}
              >
                ❌
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
