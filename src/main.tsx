import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import PresenterView from './components/PresenterView.tsx';
import './index.css';

// La ventana de "Modo presentador" se abre con ?present=1 y monta una vista
// distinta (guion + navegación) en lugar de la presentación de diapositivas.
const isPresenter = new URLSearchParams(window.location.search).get('present') === '1';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPresenter ? <PresenterView /> : <App />}
  </StrictMode>,
);
