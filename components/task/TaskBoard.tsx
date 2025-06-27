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
    const {addTask}= useTask()
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  async function handleAddEditTask(newTask: Task, isAdd: boolean) {
    if (isAdd) {
      try {
        const response = await axios.post<Task>(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks`,newTask
        );
        if (response.status === 201) {
            addTask(response.data)
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      // setTasks(
      //     tasks.map((task) => {
      //         if (task.id === newTask.id) {
      //             return newTask;
      //         }
      //         return task;
      //     })
      // );
    }

    handleCloseClick();
  }

  function handleCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
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
          <TaskList />
        </div>
      </div>
    </section>
  );
}
