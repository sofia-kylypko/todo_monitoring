import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'
import App from './App.tsx'
import { store } from './app/store.ts'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* add provider to connect redux store */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
