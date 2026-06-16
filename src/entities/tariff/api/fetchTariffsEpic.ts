import {
  FETCH_TARIFFS_REQUEST,
  fetchTariffsFailure,
  fetchTariffsSuccess,
  type TariffActions,
} from '@/entities/tariff/model/actions';
import { type Tariff } from '@/entities/tariff/model/types';
import { ofType } from 'redux-observable';
import { type Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

// Имитируем API-эндпоинт для поиска тарифов t2
const BASE_URL = 'https://t2-digital.ru';

/**
 * Epic для обработки живого поиска и фильтрации тарифов t2.
 * Полностью типизирован без использования unknown и any.
 */
export const fetchTariffEpic = (action$: Observable<TariffActions>): Observable<TariffActions> =>
  action$.pipe(
    // 1. Пропускаем только экшены запроса тарифов
    ofType(FETCH_TARIFFS_REQUEST),

    // 2. Извлекаем строку поиска. Явно приводим экшен к нужному подтипу,
    // чтобы TypeScript увидел payload.searchQuery
    map((action) => {
      const requestAction = action as Extract<TariffActions, { payload: { searchQuery: string } }>;
      return requestAction.payload.searchQuery;
    }),

    // 3. Избегаем повторных запросов с тем же текстом
    distinctUntilChanged(),

    // 4. Ждем 300мс после последнего ввода пользователя
    debounceTime(300),

    // 5. Переключаемся на асинхронный AJAX-запрос
    switchMap((query: string) =>
      // Типизируем дженерик метода getJSON как массив тарифов Tariff[] вместо unknown[]
      ajax.getJSON<Tariff[]>(`${BASE_URL}?search=${encodeURIComponent(query)}`).pipe(
        //response теперь строго типизирован как Tariff[]
        map((response) => fetchTariffsSuccess(response)),

        // Безопасный перехват ошибки с явной типизацией
        catchError((error: { message?: string }) =>
          of(fetchTariffsFailure(error.message || 'Ошибка загрузки тарифов')),
        ),
      ),
    ),
  );
