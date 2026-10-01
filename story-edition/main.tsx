import React from 'react';
import ReactDOM from 'react-dom/client';
import StoryApp from './StoryApp';
import './story.css';

const rootEl = document.getElementById('story-root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <StoryApp />
    </React.StrictMode>
  );
}
