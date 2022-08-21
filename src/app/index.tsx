import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './components/App';

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('plugin');
    const root = createRoot(container);
    root.render(<App />);
});
