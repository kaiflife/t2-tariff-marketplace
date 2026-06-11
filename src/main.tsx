import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { TariffSearch } from './features/tariff-search/ui/TariffSearch';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>t2 Digital — Витрина тарифов</h1>
        <TariffSearch />
      </main>
    </Provider>
  </React.StrictMode>
);
