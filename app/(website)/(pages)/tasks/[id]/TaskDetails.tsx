"use client";
import { Task } from "@/types";
import axios from "axios";
import { format } from "date-fns";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = { id: string };

const TaskDetails: React.FC<Props> = ({ id }) => {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  /** -----------------------------------
   *  Fetch data once `id` is known
   *  ----------------------------------- */
  useEffect(() => {
    if (!id) return;

    let ignore = false; // prevents late setState

    (async () => {
      try {
        const { data } = await axios.get<Task>(
          `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`
        );
        if (!ignore) setTask(data);
      } catch (err: unknown) {
        if (ignore) return;

        if (axios.isAxiosError(err)) {
            const status = err.response?.status;
            setError(
              status === 404
                ? "Invalid ID — no task found."
                : "Failed to fetch task."
            );
          } else {
            setError("An unexpected error occurred.");
          }
          
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [id]);

  //for loading ui show
  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <LoaderCircle className="h-24 w-24 animate-spin" />
      </div>
    );
  }
//   for error ui show
  if (error) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p className="text-3xl">{error}</p>
      </div>
    );
  }

//   for avoiding date error
  const dueDate =
    task?.due_date && !isNaN(Date.parse(task.due_date))
      ? format(new Date(task.due_date), "EEE MMM dd yyyy")
      : "";

  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 lg:my-20 lg:p-11">
        <div className="space-y-9 text-white lg:space-y-10">
          {/* title */}
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title" className="text-xl">
              Title
            </label>
            <input
              id="title"
              name="title"
              readOnly
              value={task?.title ?? ""}
              required
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5 outline-none"
            />
          </div>

          {/* description */}
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description" className="text-xl">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              readOnly
              required
              value={task?.description ?? ""}
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px] outline-none"
            />
          </div>

          {/* grid row */}
          <div className="md:grid grid-cols-2 gap-x-4 lg:gap-x-10 xl:gap-x-20 max-md:space-y-9">
            {/* due date */}
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="due_date" className="text-xl">
                Due Date
              </label>
              <input
                id="due_date"
                name="due_date"
                readOnly
                required
                value={dueDate}
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5 outline-none"
              />
            </div>

            {/* status */}
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="status" className="text-xl">
                Status
              </label>
              <input
                id="status"
                name="status"
                readOnly
                required
                value={task?.status ?? ""}
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5 outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskDetails;
