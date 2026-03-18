import React, { ReactElement } from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { Provider } from 'react-redux'
import { makeStore } from './makeStore'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: any
  store?: any
  route?: string
}

function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    // Create a new store instance for every test to avoid state pollution
    store = makeStore(preloadedState),
    route = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          {children}
        </MemoryRouter>
      </Provider>
    )
  }

  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) }
}

/* eslint-disable react-refresh/only-export-components */
export * from '@testing-library/react'
// Override the standard render with our custom one
export { renderWithProviders as render }