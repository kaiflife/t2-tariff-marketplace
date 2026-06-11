import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from './rootReducer';
import { rootEpic } from './rootEpic';

const epicMiddleware = createEpicMiddleware();

// Поддержка Redux DevTools в браузере
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);
