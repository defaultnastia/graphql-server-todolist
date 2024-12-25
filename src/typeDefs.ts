import gql from "graphql-tag";
import { DateTimeISOTypeDefinition } from "graphql-scalars";

const typeDefs = [
  DateTimeISOTypeDefinition,
  gql`
    scalar DateTimeISO

    type Query {
      tasks(completed: Boolean, range: DatesRangeInput): [Task!]!
      task(id: ID!): Task
    }

    type Task {
      id: ID!
      title: String!
      description: String
      completed: Boolean!
      dueDate: DateTimeISO!
    }

    input DatesRangeInput {
      startDate: DateTimeISO
      endDate: DateTimeISO
    }

    input CreateTaskInput {
      title: String! @constraint(minLength: 1, maxLength: 100)
      description: String @constraint(maxLength: 500)
      dueDate: DateTimeISO!
    }

    input UpdateTaskInput {
      title: String @constraint(minLength: 1, maxLength: 100)
      description: String @constraint(maxLength: 500)
      completed: Boolean
      dueDate: DateTimeISO
    }

    type Mutation {
      createTask(input: CreateTaskInput!): Task!
      updateTask(id: ID!, input: UpdateTaskInput!): Task
      deleteTask(id: ID!): Boolean
    }
  `,
];

export default typeDefs;
