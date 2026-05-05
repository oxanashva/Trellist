### Unit Test: Reducer

```typescript
// src/store/reducers/todo.reducer.test.js
import { describe, test, expect } from "vitest";
import { todoReducer } from "./todo.reducer";
import { ADD_TODO, REMOVE_TODO } from "../actions/todo.actions";

describe("todoReducer", () => {
  test("adds a todo to empty state", () => {
    // Arrange
    const initialState = { todos: [] };
    const action = { type: ADD_TODO, payload: { id: "1", text: "Buy milk" } };

    // Act
    const newState = todoReducer(initialState, action);

    // Assert
    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0]).toEqual({ id: "1", text: "Buy milk" });
  });

  test("removes a todo by id", () => {
    // Arrange
    const initialState = {
      todos: [
        { id: "1", text: "Buy milk" },
        { id: "2", text: "Walk dog" },
      ],
    };
    const action = { type: REMOVE_TODO, payload: "1" };

    // Act
    const newState = todoReducer(initialState, action);

    // Assert
    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0].id).toBe("2");
  });
});
```
