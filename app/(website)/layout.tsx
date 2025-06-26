import Header from "@/components/Header";
import { TaskProvider } from "@/utils/providers/TasksProvider";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <TaskProvider>{children}</TaskProvider>
    </>
  );
}
