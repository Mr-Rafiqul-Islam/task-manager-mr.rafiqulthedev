'use client'
import React, { useState } from "react";
import FilterBox from "./FilterBox";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal, { Task } from "./AddTaskModal";

export default function TaskBoard() {


    const [showAddModal, setShowAddModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    function handleAddEditTask(newTask:Task, isAdd:boolean) {
        if (isAdd) {
            // setTasks([...tasks, newTask]);
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
        <FilterBox/>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-12">
        {showAddModal && (
                <AddTaskModal
                    onSave={handleAddEditTask}
                    onCloseClick={handleCloseClick}
                    taskToUpdate={taskToUpdate}
                />
            )}
          <TaskActions onAddClick={()=>setShowAddModal(true)} onDeleteAllClick={()=>{}}/>
          <TaskList/>
        </div>
      </div>
    </section>
  );
}
