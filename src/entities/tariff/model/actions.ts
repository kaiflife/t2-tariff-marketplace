import { type Tariff } from './types';

// 1. Константы типов экшенов
export const FETCH_TARIFFS_REQUEST = 'tariff/FETCH_REQUEST' as const;
export const FETCH_TARIFFS_SUCCESS = 'tariff/FETCH_SUCCESS' as const;
export const FETCH_TARIFFS_FAILURE = 'tariff/FETCH_FAILURE' as const;

// 2. Интерфейсы экшенов для строгой типизации в Эпиках и Редюсере
export interface FetchTariffsRequestAction {
  type: typeof FETCH_TARIFFS_REQUEST;
  payload: { searchQuery: string };
}

export interface FetchTariffsSuccessAction {
  type: typeof FETCH_TARIFFS_SUCCESS;
  payload: Tariff[];
}

export interface FetchTariffsFailureAction {
  type: typeof FETCH_TARIFFS_FAILURE;
  payload: string;
}

// Объединяющий тип всех экшенов для редюсера
export type TariffActions =
  | FetchTariffsRequestAction
  | FetchTariffsSuccessAction
  | FetchTariffsFailureAction;

// 3. Генераторы экшенов (Action Creators)
export const fetchTariffsRequest = (searchQuery: string): FetchTariffsRequestAction => ({
  type: FETCH_TARIFFS_REQUEST,
  payload: { searchQuery },
});

export const fetchTariffsSuccess = (tariffs: Tariff[]): FetchTariffsSuccessAction => ({
  type: FETCH_TARIFFS_SUCCESS,
  payload: tariffs,
});

export const fetchTariffsFailure = (errorMessage: string): FetchTariffsFailureAction => ({
  type: FETCH_TARIFFS_FAILURE,
  payload: errorMessage,
});
