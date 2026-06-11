import {
  type TariffActions,
  FETCH_TARIFFS_FAILURE,
  FETCH_TARIFFS_REQUEST,
  FETCH_TARIFFS_SUCCESS,
} from './actions';
import { type TariffState } from './types';

// Начальное состояние экрана витрины тарифов
const initialState: TariffState = {
  list: [],
  loading: false,
  error: null,
};

export const tariffReducer = (
  state: TariffState = initialState,
  action: TariffActions,
): TariffState => {
  switch (action.type) {
    case FETCH_TARIFFS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null, // Сбрасываем старую ошибку при новом поиске
      };

    case FETCH_TARIFFS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload, // Записываем массив полученных тарифов t2
      };

    case FETCH_TARIFFS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Фиксируем текст ошибки для вывода пользователю
      };

    default:
      return state;
  }
};
