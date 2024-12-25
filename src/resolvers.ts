import tasks from "./data.json" assert { type: "json" };
import { TaskQueryArgs, TasksQueryArgs } from "./types";
import { DateTimeISOResolver, UUIDResolver } from "graphql-scalars";

const resolvers = {
  DateTimeISO: DateTimeISOResolver,
  UUID: UUIDResolver,

  Query: {
    tasks(_: any, args: TasksQueryArgs) {
      let tasksToReturn = tasks;

      if (args.completed !== undefined) {
        tasksToReturn = tasks.filter(
          (task) => task.completed === args.completed
        );
      }

      if (args.range) {
        tasksToReturn = tasksToReturn.filter((task) => {
          const taskDate = new Date(task.dueDate);
          return (
            taskDate <= args.range!.endDate && taskDate >= args.range!.startDate
          );
        });
      }

      return tasksToReturn;
    },

    task(_: any, args: TaskQueryArgs) {
      return tasks.find((task) => task.id === args.id);
    },
  },
};

export default resolvers;
