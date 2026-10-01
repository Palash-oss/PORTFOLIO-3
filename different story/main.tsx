import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// Guard against StrictMode double-mount (Rule 9)
let mounted = false;

const rootEl = document.getElementById('cinematic-root');
if (rootEl && !mounted) {
  mounted = true;
  // No StrictMode — prevents double GSAP context issues in dev
  ReactDOM.createRoot(rootEl).render(<App />);
}
