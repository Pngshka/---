'use client'
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

//const container = document.getElementById('root');
//const root = createRoot(container);
export default function Home() {
  return (
      <Provider store={store}>
        <App />
      </Provider>
  )
}
