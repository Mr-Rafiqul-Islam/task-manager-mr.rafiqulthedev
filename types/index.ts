export type Task = {
    id: string;
    title: string;
    description: string;
    due_date: string; 
    status: 'Pending' | 'In Progress' | 'Completed';
  };