import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export interface Task {
  title: string;
  description: string;
  status: string;
  due_date: string;
  id?:string;
}

interface AddTaskModalProps {
  onSave: (task: Task, isAdd: boolean) => void;
  taskToUpdate?: Task | null;
  onCloseClick: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  onSave,
  taskToUpdate = null,
  onCloseClick,
}) => {
  const isAdd = taskToUpdate === null;

  const [formData, setFormData] = React.useState<Task>({
    title: taskToUpdate?.title ?? "",
    description: taskToUpdate?.description ?? "",
    status: taskToUpdate?.status ?? "",
    due_date: taskToUpdate?.due_date ?? "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData, isAdd);
    console.log(formData);
    
  };

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onCloseClick();
      }}
    >
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>{isAdd ? "Add New Task" : "Edit Task"}</DialogTitle>
          <DialogDescription>
            Fill in the details below and hit&nbsp;Save to{" "}
            {isAdd ? "add" : "update"} the task.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-6">
          {/* Title */}
          <div className="grid gap-2">
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <label htmlFor="description">Description</label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="min-h-[120px]"
            />
          </div>

          {/* Date & Status */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="due_date">Due&nbsp;Date</label>
              <Input
                className=""
                id="due_date"
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="status">Status</label>
              <Select
                value={formData.status}
                onValueChange={handleStatusChange}
                required
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inProgress">In&nbsp;Progress</SelectItem>
                  <SelectItem value="complete">Complete</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer buttons */}
          <DialogFooter>
            <div className="flex justify-between items-center w-full">
              <Button
                variant="destructive"
                type="button"
                onClick={onCloseClick}
              >
                Close
              </Button>
              <Button type="submit" variant="secondary">
                Save
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskModal;
