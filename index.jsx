import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app';
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log("starting app")
root.render(<BrowserRouter><App /></BrowserRouter>);
