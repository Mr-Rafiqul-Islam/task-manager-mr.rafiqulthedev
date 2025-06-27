"use client";
import axios, { AxiosError } from "axios";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

/* ---------- types ---------- */
export type Task = {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: "Pending" | "In Progress" | "Completed";
};

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, changes: Partial<Omit<Task, "id">>) => void;
  clearTasks: () => void;
}

/* ---------- context ---------- */
export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // ⬅️  start true

  /* ---------- fetch once ---------- */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get<Task[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        );
        setTasks(data);
      } catch (err: unknown) {
        const msg = axios.isAxiosError(err)
          ? err.message
          : "Unknown error while fetching tasks";
        console.error(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------- helpers ---------- */
  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const removeTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));
  const editTask = (id: string, changes: Partial<Omit<Task, "id">>) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)));
  const clearTasks = () => setTasks([]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        setLoading,
        addTask,
        removeTask,
        editTask,
        clearTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
