"use client";
import React, { useState } from "react";
import FilterBox from "./FilterBox";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import axios from "axios";
import useTask from "@/utils/hooks/useTask";
import { Task,TaskPayload } from "@/types";

interface TaskType {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: "Pending" | "In Progress" | "Completed";
}

export default function TaskBoard() {
  const { addTask, editTask,removeTask, } = useTask();
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);

  async function handleAddEditTask(payload: TaskPayload, isAdd: boolean) {
    if (isAdd) {
      // for create task
      const { data } = await axios.post<Task>(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        payload,
      );
      addTask(data);
    } else if (taskToUpdate?.id) {
      // for edit task
      const { data } = await axios.put<Task>(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskToUpdate.id}`,
        payload,
      );
      editTask(data.id, data); 
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

  async function handleDeleteTask(taskId: string) {
    
    try {
      const response = await axios.delete<Task>(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`
      );
      if (response.status === 200) {
        removeTask(taskId);
        }
    } catch(err){
      console.error(err);
    }
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
          />
          <TaskList onEdit={handleEditTask} onDelete={handleDeleteTask} />
        </div>
      </div>
    </section>
  );
}
