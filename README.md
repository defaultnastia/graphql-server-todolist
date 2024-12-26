# graphql-server-todolist

## done

- GraphQL Schema
- Backend Logic
- Error Handling (404 error and constraints validation errors)
- Testing (simple jest tests)

## important

please read before launching:

- main branch has tests, but data transforming mutates original data json (due
  to jest limitation)
- backup-branch-dist-data-operations branch has NO tests, but data transforming
  mutates the dist data
- feature-validation branch contains simple JOI validation example, though I
  decided to leave constraints in main implementation

### not done:

Implement pagination for the tasks query.
