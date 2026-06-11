import { fetchTariffsEpic } from '@/entities/tariff/api/fetchTariffsEpic';
import { combineEpics } from 'redux-observable';

export const rootEpic = combineEpics(
  fetchTariffsEpic,
  // Сюда в будущем добавятся другие эпики (например, authEpic, basketEpic)
);
