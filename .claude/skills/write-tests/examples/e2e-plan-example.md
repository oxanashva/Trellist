### E2E Plan File (for infra repo)

````markdown
<!-- e2e-plans/todo-crud.md -->

# E2E Test Plan: Todo CRUD Operations

**Status:** ⏳ Pending implementation in [app-name]-infra  
**Created:** 2025-01-16  
**Frontend PR:** #123

## User Journey to Test

1. User logs in to the application
2. Navigates to /todos page
3. Sees existing todos loaded from backend
4. Clicks "Add Todo" button
5. Fills in todo text: "Buy groceries"
6. Clicks "Save"
7. Sees new todo appear in the list
8. Clicks on the todo to view details page (/todos/:id)
9. Clicks "Edit" button
10. Changes text to "Buy groceries and cook dinner"
11. Clicks "Save"
12. Navigates back to /todos
13. Sees updated todo in the list
14. Clicks "Delete" on the todo
15. Confirms deletion in modal
16. Todo disappears from list

## Critical Assertions

- [ ] Todo list loads from API on page mount
- [ ] New todo appears in list immediately after creation
- [ ] Todo details page shows correct data
- [ ] Edits persist when navigating back to list
- [ ] Deleted todos are removed from list
- [ ] API calls are made with correct payloads
- [ ] UI shows loading states during API calls
- [ ] Error states are handled gracefully

## Test Data Requirements

```json
{
  "user": {
    "email": "test@example.com",
    "password": "Test123!"
  },
  "initialTodos": [
    { "id": "1", "text": "Existing task 1", "completed": false },
    { "id": "2", "text": "Existing task 2", "completed": true }
  ]
}
```

## API Endpoints Involved

- GET /api/todos (list)
- POST /api/todos (create)
- GET /api/todos/:id (read)
- PUT /api/todos/:id (update)
- DELETE /api/todos/:id (delete)

## Suggested Playwright Selectors

```javascript
// Navigation
const todosLink = page.getByRole("link", { name: /todos/i });

// List page
const todoListItems = page.getByRole("listitem");
const addTodoBtn = page.getByRole("button", { name: /add todo/i });
const todoInput = page.getByRole("textbox", { name: /todo text/i });
const saveBtn = page.getByRole("button", { name: /save/i });

// Details page
const editBtn = page.getByRole("button", { name: /edit/i });
const deleteBtn = page.getByRole("button", { name: /delete/i });
const confirmDeleteBtn = page.getByRole("button", { name: /confirm/i });

// Finding specific todo
const todoItem = page
  .getByRole("listitem")
  .filter({ hasText: "Buy groceries" });
```

## Edge Cases to Cover

1. Network error during creation (show error, retry)
2. Network error during deletion (show error, don't remove from list)
3. Validation errors (empty todo text)
4. Concurrent edits (if real-time updates implemented)
5. Browser refresh on details page (loads data from API)

## Implementation Location

`[app-name]-infra/e2e/tests/todos/todo-crud.spec.ts`

## Notes for Infrastructure Team

- Requires database seeding with initial todos before test
- Use `beforeEach` to reset database state
- Mock authentication or use test user credentials
- Run against localhost:5173 (frontend) + localhost:3030 (backend)
````
