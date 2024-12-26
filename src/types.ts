import { UUIDTypes } from "uuid";

export interface TasksQueryArgs {
  completed?: boolean;
  range?: {
    startDate: Date;
    endDate: Date;
  };
}

export interface TaskQueryArgs {
  id: UUIDTypes;
}

export interface Task {
  id: UUIDTypes;
  title: string;
  description?: string | null;
  completed: boolean;
  dueDate: Date;
}

export interface TaskCreateArgs {
  title: string;
  description?: string | null;
  completed?: boolean;
  dueDate: Date;
}

export interface MutationTaskCreateArgs {
  input: TaskCreateArgs;
}

export interface TaskUpdateArgs {
  title?: string;
  description?: string | null;
  completed?: boolean;
  dueDate?: Date;
}
export interface MutationTaskUpdateArgs {
  input: TaskUpdateArgs;
  id: UUIDTypes;
}

export interface MutationTaskDeleteArgs {
  id: UUIDTypes;
}

export interface ResponseStatus {
  code: number;
  count?: number;
  data?: any;
}
