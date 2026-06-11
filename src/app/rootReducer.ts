import { combineReducers } from 'redux';
import { tariffReducer } from '../entities/tariff/model/reducer';

export const rootReducer = combineReducers({
  tariff: tariffReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
