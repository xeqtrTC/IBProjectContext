import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ContextStateProvider } from './context/Context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ContextStateProvider>
    <App />
  </ContextStateProvider>
)
