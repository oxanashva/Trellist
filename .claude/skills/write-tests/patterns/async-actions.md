### Testing Async Actions (with MSW)

```typescript
test("dispatches SET_TODOS action after successful API call", async () => {
  // Arrange
  const mockTodos = [{ id: "1", text: "Test" }];
  server.use(http.get("/api/todos", () => HttpResponse.json(mockTodos)));
  const store = makeStore();

  // Act
  await store.dispatch(loadTodos());

  // Assert
  const state = store.getState();
  expect(state.todos).toEqual(mockTodos);
});
```
