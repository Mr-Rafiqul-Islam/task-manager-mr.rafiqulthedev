"use client";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

// Define your task type
type Task = {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: "Pending" | "In Progress" | "Completed";
};

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  removeTask: (id: string) => void;
  editTask: (id: string, changes: Partial<Omit<Task, "id">>) => void;
  clearTasks: () => void;
}

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // ✅ Fetch tasks on first render
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

  const removeTask = (id: string) =>
    setTasks((prev) => prev.filter((task) => task.id !== id));

  const editTask = (id: string, changes: Partial<Omit<Task, "id">>) =>
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...changes } : task))
    );

  const clearTasks = () => setTasks([]);

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, removeTask, editTask, clearTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};
