# graphql-server-todolist

## done

- GraphQL Schema
- Backend Logic
- Error Handling (404 error and constraints validation errors)
- Testing (simple jest tests)

## important

production link: https://graphql-server-todolist-production.up.railway.app/

example

```yml Get All Tasks
curl --location 'https://graphql-server-todolist-production.up.railway.app/' \
--header 'Content-Type: application/json' \
--data '{"query":"query Query {tasks {code message count data {id title description completed dueDate}}}"}'
```

please read before launching:

- main branch has tests, but data transforming mutates original data json (due
  to jest limitation)
- backup-branch-dist-data-operations branch has NO tests, but data transforming
  mutates the dist data
- feature-validation branch contains simple JOI validation example, though I
  decided to leave constraints in main implementation

## not done:

Implement pagination for the tasks query (at least I added count to make it
easier)
