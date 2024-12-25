import gql from "graphql-tag";

const typeDefs = gql`
  scalar UUID
  scalar DateTimeISO

  type Query {
    tasks: [Task!]!
    task(id: ID!): Task
  }

  type Task {
    id: UUID!
    title: String!
    description: String
    completed: Boolean!
    dueDate: DateTimeISO!
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
`;

export default typeDefs;
