import { combineEpics } from 'redux-observable';
import { fetchTariffsEpic } from '@/entities/tariff/epics/tariffEpics';

export const rootEpic = combineEpics(
  fetchTariffsEpic
  // Сюда в будущем добавятся другие эпики (например, authEpic, basketEpic)
);
