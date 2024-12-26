import * as datasources from "./datasources";
import handleResponse from "./responseHandler";
import {
  MutationTaskCreateArgs,
  MutationTaskUpdateArgs,
  MutationTaskDeleteArgs,
  TaskQueryArgs,
  TasksQueryArgs,
} from "./types";
import { DateTimeISOResolver } from "graphql-scalars";

const resolvers = {
  DateTimeISO: DateTimeISOResolver,

  Query: {
    tasks: async (_: any, args: TasksQueryArgs) => {
      const allTasks = await datasources.getAllTasks(args);

      return handleResponse({
        code: 200,
        count: allTasks.length,
        data: allTasks,
      });
    },

    task: async (_: any, args: TaskQueryArgs) => {
      const searchedTask = await datasources.getOneTask(args);

      return handleResponse({
        code: searchedTask ? 200 : 404,
        data: searchedTask,
      });
    },
  },

  Mutation: {
    createTask: async (_: any, { input }: MutationTaskCreateArgs) => {
      const newTask = await datasources.createOneTask(input);
      return handleResponse({
        code: newTask ? 200 : 404,
        data: newTask,
      });
    },

    updateTask: async (_: any, { input, id }: MutationTaskUpdateArgs) => {
      const updatedTask = await datasources.updateOneTask(input, id);
      return handleResponse({
        code: updatedTask ? 200 : 404,
        data: updatedTask,
      });
    },

    deleteTask: async (_: any, { id }: MutationTaskDeleteArgs) => {
      const deletedTask = await datasources.deleteOneTask(id);
      return handleResponse({ code: deletedTask ? 200 : 404 });
    },
  },
};

export default resolvers;
