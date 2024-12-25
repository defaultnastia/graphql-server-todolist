import tasks from "./data.json" assert { type: "json" };
import { TaskQueryArgs, TasksQueryArgs } from "./types";

const resolvers = {
  Query: {
    tasks(_: any, args: TasksQueryArgs) {
      let tasksToReturn = tasks;

      if (args.isCompleted) {
        tasksToReturn = tasks.filter((task) => task.completed === true);
      }

      if (args.range) {
        tasksToReturn = tasks.filter((task) => {
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
