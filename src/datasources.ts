import { promises as fs } from "fs";
// import path from "node:path";
import { UUIDTypes, v4 as uuidv4 } from "uuid";

import {
  Task,
  TaskCreateArgs,
  TaskQueryArgs,
  TasksQueryArgs,
  TaskUpdateArgs,
} from "./types";

const returnPath = () => {
  let tasksPath = "./src/data.json";

  //! == wanted to move data operations to dist but couldn't make path work with jest ==
  // if (path) {
  //   const __dirname = import.meta.dirname;
  //   tasksPath = path.join(__dirname, "data.json");
  // }

  return tasksPath;
};

const rewriteTasks = async (newTasks: Task[]) => {
  await fs.writeFile(returnPath(), JSON.stringify(newTasks, null, 2));
};

const listTasks = async (): Promise<Task[]> => {
  const allTasks = await fs.readFile(returnPath(), "utf8");
  return JSON.parse(allTasks);
};

// === QUERY ===
export const getAllTasks = async (props: TasksQueryArgs): Promise<Task[]> => {
  let tasksToReturn = await listTasks();

  if (props.completed !== undefined) {
    tasksToReturn = tasksToReturn.filter(
      (task) => task.completed === props.completed
    );
  }

  if (props.range?.endDate && props.range?.startDate) {
    tasksToReturn = tasksToReturn.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate <= props.range!.endDate && taskDate >= props.range!.startDate
      );
    });
  }

  if (props.range?.endDate) {
    tasksToReturn = tasksToReturn.filter((task) => {
      return new Date(task.dueDate) <= props.range!.endDate;
    });
  }

  if (props.range?.startDate) {
    tasksToReturn = tasksToReturn.filter((task) => {
      return new Date(task.dueDate) >= props.range!.startDate;
    });
  }

  return tasksToReturn || [];
};

export const getOneTask = async (
  props: TaskQueryArgs
): Promise<Task | null> => {
  const tasks = await listTasks();
  return tasks.find((task) => task.id === props.id) || null;
};

// === MUTATION ===
export const createOneTask = async ({
  title,
  description = null,
  completed = false,
  dueDate,
}: TaskCreateArgs): Promise<Task> => {
  const tasks = await listTasks();

  const newTask = {
    id: uuidv4(),
    title,
    description,
    completed,
    dueDate,
  };
  tasks.push(newTask);
  await rewriteTasks(tasks);

  return newTask;
};

export const updateOneTask = async (
  { title, description, completed = false, dueDate }: TaskUpdateArgs,
  id: UUIDTypes
): Promise<Task | null> => {
  const tasks = await listTasks();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) return null;

  if (title) tasks[index].title = title;
  if (description) tasks[index].description = description;
  if (completed) tasks[index].completed = completed;
  if (dueDate) tasks[index].dueDate = dueDate;

  await rewriteTasks(tasks);

  return tasks[index];
};

export const deleteOneTask = async (id: UUIDTypes): Promise<boolean> => {
  const tasks = await listTasks();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) return false;

  tasks.splice(index, 1);

  await rewriteTasks(tasks);

  return true;
};
