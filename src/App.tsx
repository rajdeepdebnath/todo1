import { useEffect, useState } from "react";
import "./App.css";

type taskType = {
  id: number;
  task: string;
  deleted: boolean;
  completed: boolean;
};

function App() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<taskType[]>(
    JSON.parse(localStorage.getItem("tasks") ?? "") || []
  );
  const [display, setDisplay] = useState<taskType[]>([]);

  const addTask = () => {
    if (!tasks.find((t) => t.task === task)) {
      setTasks((t) => [
        ...t,
        {
          id: Math.floor(Math.random() * 100000),
          task,
          deleted: false,
          completed: false,
        },
      ]);
    }

    setTask("");
  };

  const handleDelete = (id: number) => {
    const filtered = tasks.filter((e) => e.id !== id);
    setTasks(filtered);
  };

  const handleComplete = (id: number) => {
    const idx = tasks.findIndex((e) => e.id === id);
    if (idx >= 0) {
      const t = tasks[idx];
      t.completed = !t.completed;
      const nt = [...tasks];
      nt.splice(idx, 1, { ...t });
      setTasks(nt);
    }
  };

  useEffect(
    () => localStorage.setItem("tasks", JSON.stringify(tasks)),
    [tasks]
  );

  useEffect(() => setDisplay([...tasks]), [tasks]);

  const filter = (v: string) => {
    console.log(v);
    if (v === "2") {
      const filtered = tasks.filter((e) => e.completed);
      setDisplay([...filtered]);
    } else if (v === "3") {
      const filtered = tasks.filter((e) => !e.completed);
      setDisplay([...filtered]);
    } else if (v === "1") {
      setDisplay([...tasks]);
    }
  };

  return (
    <>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <div>
        <select onChange={(e) => filter(e.target.value)}>
          <option value="1">All</option>
          <option value="2">Completed</option>
          <option value="3">Incomplete</option>
        </select>
      </div>
      <div>
        {display.map((t) => (
          <div key={t.id}>
            {t.id}-{t.task}
            <button onClick={() => handleComplete(t.id)}>
              {t.completed ? "Completed" : "Incomplete"}
            </button>
            <button onClick={() => handleDelete(t.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
