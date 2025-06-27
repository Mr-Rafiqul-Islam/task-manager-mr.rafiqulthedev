"use client";
import useTask from "@/utils/hooks/useTask";
import { Filter } from "@/utils/providers/TasksProvider";
import { FilterIcon } from "lucide-react";
import React from "react";

export default function FilterBox() {
  const { filter, setFilter } = useTask();

  return (
    <div className="flex justify-end p-2">
      <div className="flex items-center gap-4">
        <FilterIcon />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Filter)}
          className="rounded-sm border-none bg-gray-800 px-4 py-2 accent-orange-600 outline-none"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In&nbsp;Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
