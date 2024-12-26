import gql from "graphql-tag";
import { DateTimeISOTypeDefinition } from "graphql-scalars";

const typeDefs = [
  DateTimeISOTypeDefinition,
  gql`
    scalar DateTimeISO

    type Query {
      tasks(completed: Boolean, range: DatesRangeInput): GetAllTasksResponse!
      task(id: ID!): GetOneTaskResponse!
    }

    type GetAllTasksResponse {
      code: Int!
      message: String!
      count: Int
      data: [Task!]!
    }

    type GetOneTaskResponse {
      code: Int!
      message: String!
      data: Task
    }

    type Task {
      id: ID!
      title: String!
      description: String
      completed: Boolean
      dueDate: DateTimeISO
    }

    input DatesRangeInput {
      startDate: DateTimeISO
      endDate: DateTimeISO
    }

    input CreateTaskInput {
      title: String! @constraint(minLength: 1, maxLength: 100)
      description: String! @constraint(maxLength: 500)
      dueDate: DateTimeISO!
      completed: Boolean
    }

    input UpdateTaskInput {
      title: String @constraint(minLength: 1, maxLength: 100)
      description: String @constraint(maxLength: 500)
      completed: Boolean
      dueDate: DateTimeISO
    }

    type Mutation {
      createTask(input: CreateTaskInput!): CreateNewTaskResponse!
      updateTask(id: ID!, input: UpdateTaskInput!): UpdateTaskResponse!
      deleteTask(id: ID!): DeleteTaskResponse
      updateAllTasks: UpdateAllTasksResponse
    }

    type CreateNewTaskResponse {
      code: Int!
      message: String!
      data: Task
    }

    type UpdateTaskResponse {
      code: Int!
      message: String!
      data: Task
    }

    type DeleteTaskResponse {
      code: Int!
      message: String!
    }

    type UpdateAllTasksResponse {
      code: Int!
      message: String!
      count: Int!
      data: [Task!]!
    }
  `,
];

export default typeDefs;
