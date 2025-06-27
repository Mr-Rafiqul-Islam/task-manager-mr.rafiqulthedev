export type TaskStatus = "Pending" | "In Progress" | "Completed";
export type Task = {
  id: string;
  title: string;
  description: string;
  due_date: string;
  status: TaskStatus;
};

export type TaskPayload = Omit<Task, "id">;
