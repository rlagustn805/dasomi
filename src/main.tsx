import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

const removeLoadingScreen = () => {
    const loadingElement = document.getElementById('loading');
    const rootElement = document.getElementById('root');

    if (loadingElement && rootElement) {
        loadingElement.style.display = 'none';
        rootElement.style.display = 'block';
    }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Analytics />
            <App />
        </BrowserRouter>
    </React.StrictMode>
);

removeLoadingScreen();
