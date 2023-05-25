import React from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from "./App";

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<AppWrapper />);