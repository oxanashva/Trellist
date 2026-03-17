### Testing Form Submissions

```typescript
test('submits form with user input', async () => {
  // Arrange
  const user = userEvent.setup()
  const handleSubmit = vi.fn()
  render(<TodoForm onSubmit={handleSubmit} />)

  // Act
  await user.type(screen.getByLabelText(/todo/i), 'New task')
  await user.click(screen.getByRole('button', { name: /submit/i }))

  // Assert
  expect(handleSubmit).toHaveBeenCalledWith({ text: 'New task' })
})
```
