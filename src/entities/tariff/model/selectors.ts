import type { RootState } from '@/app/rootReducer';
import { type Tariff } from './types';

/**
 * Базовый селектор для получения всего среза состояния тарифов.
 */
export const selectTariffState = (state: RootState) => state.tariff;

/**
 * Селектор для получения списка тарифов.
 */
export const selectTariffsList = (state: RootState): Tariff[] => selectTariffState(state).list;

/**
 * Селектор статуса загрузки (используется для отображения лоадера).
 */
export const selectTariffsLoading = (state: RootState): boolean => selectTariffState(state).loading;

/**
 * Селектор для получения ошибки, если запрос к API t2 завершился неудачей.
 */
export const selectTariffsError = (state: RootState): string | null =>
  selectTariffState(state).error;
