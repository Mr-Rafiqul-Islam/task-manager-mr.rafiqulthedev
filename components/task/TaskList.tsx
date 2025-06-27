"use client";
import { Task } from "@/types";
import { format } from "date-fns";
import useTask from "@/utils/hooks/useTask";
import { formatCamelCase, getStatusColor } from "@/utils/helper";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<Props> = ({ onEdit, onDelete }) => {
  const { filteredTasks, loading } = useTask();
  const router = useRouter();

  const handleView = (id: string) => router.push(`/tasks/${id}`);

  //   for loading skeleton
  const SkeletonCell = ({ colSpan }: { colSpan: number }) => (
    <td className="px-4 py-2" colSpan={colSpan}>
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-3 w-full animate-pulse rounded bg-gray-700"
          />
        ))}
      </div>
    </td>
  );

  return (
    <div className="overflow-auto">
      <table className="table-fixed xl:w-full">
        <thead>
          <tr>
            <th className="w-[100px] p-4 pb-8 text-base font-semibold">
              SL No.
            </th>
            <th className="w-full p-4 pb-8 text-base font-semibold">Title</th>
            <th className="w-[300px] p-4 pb-8 text-base font-semibold">
              Status
            </th>
            <th className="md:w-[350px] p-4 pb-8 text-base font-semibold">
              Due Date
            </th>
            <th className="md:w-[200px] p-4 pb-8 text-base font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <SkeletonCell colSpan={5} />
            </tr>
          ) : filteredTasks.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-2xl">
                No tasks match this filter.
              </td>
            </tr>
          ) : (
            filteredTasks.map((task, i) => (
              <tr
                key={task.id}
                className="border-b border-[#2E3443] [&>td]:px-4 [&>td]:py-2"
              >
                <td>{i + 1}</td>

                <td className="capitalize text-center">{task.title}</td>

                <td
                  className={`text-center font-bold ${getStatusColor(task.status)}`}
                >
                  {formatCamelCase(task.status)}
                </td>

                <td className="text-center">
                  {format(new Date(task.due_date), "EEE MMM dd yyyy")}
                </td>

                <td>
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => handleView(task.id)}
                      className="rounded-[45px] bg-[#00D991A1] px-2.5 text-sm text-white transition-transform duration-300 hover:scale-125"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onEdit(task)}
                      className="rounded-[45px] bg-[#1C92FFB0] px-2.5 text-sm text-white transition-transform duration-300 hover:scale-125"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="rounded-[45px] bg-[#FE1A1AB5] px-2.5 text-sm text-white transition-transform duration-300 hover:scale-125"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
