"use client";
import { Task } from "@/types";
import { format } from "date-fns";
import useTask from "@/utils/hooks/useTask";

import React from "react";

export default function TaskList() {
  const { tasks } = useTask();
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

        {tasks.length === 0 ? (
          <tbody>
            <tr className="w-full">
              <td className="text-center text-2xl w-full" colSpan={5}>
                There is no task to show..
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {tasks.map((task: Task, idx: number) => (
              <tr
                key={task.id}
                className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2"
              >
                <td>{idx + 1}</td>
                <td>
                  <div className="flex items-center justify-center">
                    {task.title}
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    {task.status}
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    {format(new Date(task.due_date), "EEE MMM dd yyyy")}
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-center space-x-3">
                    <button className="text-white text-sm rounded-[45px] h-5 px-2.5 bg-[#00D991A1]">
                      View
                    </button>
                    <button className="text-white text-sm rounded-[45px] h-5 px-2.5 bg-[#1C92FFB0]">
                      Edit
                    </button>
                    <button className="text-white text-sm rounded-[45px] h-5 px-2.5 bg-[#FE1A1AB5]">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
        {/* <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
          <td>1</td>
          <td>
            <div className="flex items-center justify-center">
              Integration API in Task Web Application
            </div>
          </td>
          <td>
            <div className="flex items-center justify-center">Pending</div>
          </td>
          <td>
            <div className="flex items-center justify-center">
              Wed Feb 11 2025
            </div>
          </td>
          <td>
            <div className="flex items-center justify-center space-x-3">
              <button className="text-white text-sm rounded-[45px] h-5 px-2.5 bg-[#00D991A1]">
                View
              </button>
              <button className="text-white text-sm rounded-[45px] h-5 px-2.5 bg-[#1C92FFB0]">
                Edit
              </button>
              <button className="text-white text-sm rounded-[45px] h-5 px-2.5 bg-[#FE1A1AB5]">
                Delete
              </button>
            </div>
          </td>
        </tr> */}
      </table>
    </div>
  );
}
