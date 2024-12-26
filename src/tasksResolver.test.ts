import assert from "node:assert";
import { ApolloServer } from "@apollo/server";

import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import {
  constraintDirective,
  constraintDirectiveTypeDefs,
} from "graphql-constraint-directive";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ResponseStatus } from "./types";
import { UUIDTypes } from "uuid";

let schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers,
});

schema = constraintDirective()(schema);

let testedId: UUIDTypes;

it("returns correct count of all mocked documents", async () => {
  const testServer = new ApolloServer({
    schema,
  });

  const response = await testServer.executeOperation({
    query: "query Tasks {tasks {count}}",
  });

  assert(response.body.kind === "single");
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data).toBeDefined();
  expect((response.body.singleResult.data?.tasks as ResponseStatus).count).toBe(
    10
  );
});

it("returns success code and a task info when creating a new task", async () => {
  const testServer = new ApolloServer({
    schema,
  });

  const response = await testServer.executeOperation({
    query:
      "mutation CreateTask($input: CreateTaskInput!) {createTask(input: $input) {code data {dueDate description completed id}}}",
    variables: {
      input: {
        description: "Test Desc",
        dueDate: "2024-07-14T12:59:44.00Z",
        title: "Test Title",
      },
    },
  });

  assert(response.body.kind === "single");
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data).toBeDefined();
  expect(
    (response.body.singleResult.data?.createTask as ResponseStatus).code
  ).toBe(200);

  expect(
    (response.body.singleResult.data?.createTask as ResponseStatus).data.id
  ).toBeDefined;
  testedId = (response.body.singleResult.data?.createTask as ResponseStatus)
    .data.id;

  expect(
    (response.body.singleResult.data?.createTask as ResponseStatus).data
      .completed
  ).toBe(false);
});

it("returns existing task with valid ID", async () => {
  const testServer = new ApolloServer({
    schema,
  });

  const response = await testServer.executeOperation({
    query: "query Task($taskId: ID!) {task(id: $taskId) {code}}",
    variables: {
      taskId: testedId,
    },
  });

  assert(response.body.kind === "single");
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data).toBeDefined();
  expect((response.body.singleResult.data?.task as ResponseStatus).code).toBe(
    200
  );
});

it("updates existing task with valid ID", async () => {
  const testServer = new ApolloServer({
    schema,
  });

  const response = await testServer.executeOperation({
    query:
      "mutation UpdateTask($taskId: ID! $input: UpdateTaskInput!) {updateTask(id: $taskId input: $input) {code data {completed}}}",
    variables: {
      input: {
        completed: true,
      },
      taskId: testedId,
    },
  });

  assert(response.body.kind === "single");
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data).toBeDefined();
  expect(
    (response.body.singleResult.data?.updateTask as ResponseStatus).code
  ).toBe(200);
  expect(
    (response.body.singleResult.data?.updateTask as ResponseStatus).data
      .completed
  ).toBe(true);
});

it("deletes existing task with valid ID", async () => {
  const testServer = new ApolloServer({
    schema,
  });

  const response = await testServer.executeOperation({
    query: "mutation DeleteTask($taskId: ID!) {deleteTask(id: $taskId) {code}}",
    variables: {
      taskId: testedId,
    },
  });

  assert(response.body.kind === "single");
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data).toBeDefined();
  expect(
    (response.body.singleResult.data?.deleteTask as ResponseStatus).code
  ).toBe(200);
});

it("returns 404 when deleting non-existing task", async () => {
  const testServer = new ApolloServer({
    schema,
  });

  const response = await testServer.executeOperation({
    query: "mutation DeleteTask($taskId: ID!) {deleteTask(id: $taskId) {code}}",
    variables: {
      taskId: testedId,
    },
  });

  assert(response.body.kind === "single");
  expect(response.body.singleResult.errors).toBeUndefined();
  expect(response.body.singleResult.data).toBeDefined();
  expect(
    (response.body.singleResult.data?.deleteTask as ResponseStatus).code
  ).toBe(404);
});
