"use client";
import { Task } from "@/types";
import { format } from "date-fns";
import useTask from "@/utils/hooks/useTask";

import React from "react";
import { formatCamelCase } from "@/utils/helper";

interface TaskPropType {
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}
const TaskList: React.FC<TaskPropType> = ({ onEdit, onDelete }) => {
  const { tasks, loading } = useTask();
  return (
    <div className="overflow-auto">
      <table className="table-fixed overflow-auto xl:w-full">
        <thead>
          <tr>
            <th className="p-4 pb-8 text-base font-semibold capitalize w-[100px]">
              SL No.
            </th>
            <th className="p-4 pb-8 text-base font-semibold capitalize w-full">
              {" "}
              Title{" "}
            </th>
            <th className="p-4 pb-8 text-base font-semibold capitalize w-[300px]">
              {" "}
              Status{" "}
            </th>
            <th className="p-4 pb-8 text-base font-semibold capitalize md:w-[350px]">
              {" "}
              Due Date{" "}
            </th>

            <th className="p-4 pb-8 text-base font-semibold capitalize md:w-[200px]">
              {" "}
              Actions{" "}
            </th>
          </tr>
        </thead>

        {loading ? (
          <tbody>
            <tr>
              <td
                className="text-center text-2xl w-full animate-pulse"
                colSpan={5}
              >
                <div className="h-3 bg-gray-700 rounded-full w-full mb-4" />
                <div className="h-3 bg-gray-700 rounded-full w-full mb-4" />
                <div className="h-3 bg-gray-700 rounded-full w-full mb-4" />
                <div className="h-3 bg-gray-700 rounded-full w-full mb-4" />
                <div className="h-3 bg-gray-700 rounded-full w-full mb-4" />
              </td>
            </tr>
          </tbody>
        ) : tasks?.length === 0 ? (
          <tbody>
            <tr className="w-full">
              <td className="text-center text-2xl w-full" colSpan={5}>
                There is no task to show..
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {tasks?.map((task: Task, idx: number) => (
              <tr
                key={task.id}
                className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2"
              >
                <td>{idx + 1}</td>
                <td>
                  <div className="flex items-center justify-center capitalize">
                    {task.title}
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    {formatCamelCase(task.status)}
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    {format(new Date(task.due_date), "EEE MMM dd yyyy")}
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-center space-x-3">
                    <button className="text-white text-sm rounded-[45px] h-5 px-2.5 bg-[#00D991A1] hover:scale-125 duration-300 transition-all">
                      View
                    </button>
                    <button
                      className="text-white text-sm rounded-[45px] h-5 px-2.5 bg-[#1C92FFB0] hover:scale-125 duration-300 transition-all"
                      onClick={() => onEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-white text-sm rounded-[45px] h-5 px-2.5 bg-[#FE1A1AB5] hover:scale-125 duration-300 transition-all"
                      onClick={() => onDelete(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
        
      </table>
    </div>
  );
};

export default TaskList;