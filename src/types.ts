import { UUID } from "crypto";

export interface TasksQueryArgs {
  isCompleted?: true;
  range?: {
    startDate: Date;
    endDate: Date;
  };
}

export interface TaskQueryArgs {
  id: UUID;
}

export interface Task {
  id: UUID;
  title: string;
  description?: string;
  completed: boolean;
  dueDate: Date;
}
