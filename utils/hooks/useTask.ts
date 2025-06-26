'use client';
import { useContext } from 'react';
import { TaskContext } from '../providers/TasksProvider';

export default function useTask() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTask must be used within a TaskProvider');
  return ctx;
}
