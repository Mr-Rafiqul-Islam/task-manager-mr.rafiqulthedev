import React from "react";

export default function FilterBox() {
  return (
    <div className="p-2 flex justify-end">
      <div className="flex gap-4 items-center">
        {/* <FilterIcon /> */}
        <select
          className="bg-gray-800 px-4 py-2 accent-orange-600 border-none outline-none rounded-sm"
          //   value={filter}
          //   onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
