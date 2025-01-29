import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create root before any other operations
const root = createRoot(document.getElementById('root')!);

// Render immediately without StrictMode in production
if (import.meta.env.PROD) {
  root.render(<App />);
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}