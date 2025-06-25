import React from "react";

export default function TaskBoard() {
  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        {/* Filter Box */}
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
        {/* Filter Box Ends */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <div className="mb-14 items-center justify-between sm:flex">
            <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
            <div className="flex items-center space-x-5">
              <button className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold">
                Add Task
              </button>
              <button className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold">
                Delete All
              </button>
            </div>
          </div>
          <div className="overflow-auto">
            <table className="table-fixed overflow-auto xl:w-full">
              <thead>
                <tr>
                  <th className="p-4 pb-8 text-sm font-semibold capitalize w-[80px]">
                    SL No.
                  </th>
                  <th className="p-4 pb-8 text-sm font-semibold capitalize w-full">
                    {" "}
                    Title{" "}
                  </th>
                  <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]">
                    {" "}
                    Status{" "}
                  </th>
                  <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]">
                    {" "}
                    Due Date{" "}
                  </th>

                  <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[200px]">
                    {" "}
                    Actions{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
                  <td>1</td>
                  <td>
                    <div className="flex items-center justify-center">
                      Integration API in Task Web Application
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-center">
                      Pending
                    </div>
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
