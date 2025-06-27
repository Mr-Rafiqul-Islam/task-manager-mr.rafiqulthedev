"use client";
import React, { useState } from "react";
import FilterBox from "./FilterBox";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal, { Task } from "./AddTaskModal";
import axios from "axios";
import useTask from "@/utils/hooks/useTask";

interface TaskType {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: "Pending" | "In Progress" | "Completed";
}

export default function TaskBoard() {
  const { addTask, editTask } = useTask();
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);

  async function handleAddEditTask(newTask: Task, isAdd: boolean) {
    if (isAdd) {
      try {
        const response = await axios.post<Task>(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
          newTask
        );
        if (response.status === 201) {
          addTask(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const response = await axios.put<Task>(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskToUpdate?.id}`,
          newTask
        );
        if (response.status === 200) {
            editTask(taskToUpdate!.id, newTask);
          }
      } catch (err) {
        console.error(err);
      }
    }

    handleCloseClick();
  }

  function handleCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  function handleEditTask(task: Task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleDeleteTask(taskId: string) {
    console.log(taskId);
  }
  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        <FilterBox />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-12">
          {showAddModal && (
            <AddTaskModal
              onSave={handleAddEditTask}
              onCloseClick={handleCloseClick}
              taskToUpdate={taskToUpdate}
            />
          )}
          <TaskActions
            onAddClick={() => setShowAddModal(true)}
            onDeleteAllClick={() => {}}
          />
          <TaskList onEdit={handleEditTask} onDelete={handleDeleteTask} />
        </div>
      </div>
    </section>
  );
}
