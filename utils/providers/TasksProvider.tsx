// utils/contexts/TaskContext.tsx
"use client";
import { Task } from "@/types";
import axios from "axios";
import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";



export type Filter = "all" | "pending" | "inprogress" | "completed";

interface TaskContextType {
  tasks: Task[]; 
  filteredTasks: Task[];
  loading: boolean;
  filter: Filter;
  /* setters & helpers */
  setFilter: Dispatch<SetStateAction<Filter>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  addTask(task: Task): void;
  removeTask(id: string): void;
  editTask(id: string, changes: Partial<Omit<Task, "id">>): void;
}

/* ---------- context ---------- */
export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

  /* fetch once */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<Task[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks`
        );
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* helper CRUD */
  const addTask = (task: Task) => setTasks((p) => [...p, task]);
  const removeTask = (id: string) =>
    setTasks((p) => p.filter((t) => t.id !== id));
  const editTask = (id: string, changes: Partial<Omit<Task, "id">>) =>
    setTasks((p) => p.map((t) => (t.id === id ? { ...t, ...changes } : t)));
  

  /* derived value */
  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter(
      (t) => t.status.toLowerCase().replace(/\s/g, "") === filter
    );
  }, [tasks, filter]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        loading,
        filter,
        setFilter,
        setLoading,
        addTask,
        removeTask,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
