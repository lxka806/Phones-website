import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { PhonesProvider } from './context/PhonesContext.jsx'

createRoot(document.getElementById('root')).render(
  <PhonesProvider>
    <App />
  </PhonesProvider>
)
