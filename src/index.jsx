import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './pages/ErrorBoundry.tsx'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { RootCmp } from './RootCmp.jsx'
import { AxiosInterceptor } from './cmps/AxiosInterceptor.tsx'
import { store } from './store/store.js'
import { logger } from './services/logger.service.js'
import './assets/styles/main.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onError={(error) => logger.error('React Boundary Catch', error)}
  >
    <Provider store={store}>
      <Router>
        <AxiosInterceptor>
          <RootCmp />
        </AxiosInterceptor>
      </Router>
    </Provider>
  </ErrorBoundary>
)
