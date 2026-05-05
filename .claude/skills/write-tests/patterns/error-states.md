### Testing Error States

```typescript
test('displays error when API call fails', async () => {
  // Arrange
  server.use(
    http.get('/api/todos', () => {
      return HttpResponse.json({ error: 'Failed' }, { status: 500 })
    })
  )

  // Act
  renderWithStore(<TodoList />)

  // Assert
  expect(await screen.findByRole('alert')).toHaveTextContent(/failed/i)
})
```
