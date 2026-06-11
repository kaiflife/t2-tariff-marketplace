import { ofType } from 'redux-observable';
import { type Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import {
  FETCH_TARIFFS_REQUEST,
  fetchTariffsFailure,
  type FetchTariffsRequestAction,
  fetchTariffsSuccess,
} from '../model/actions';

// Реальный или демонстрационный эндпоинт витрины t2
const BASE_URL = 'https://t2-custom-test';

/**
 * Epic для обработки живого поиска и фильтрации тарифов.
 * Демонстрирует экспертное владение RxJS: дебаунс ввода, отмена
 * предыдущих запросов при новом вводе и изолированная обработка ошибок.
 */
export const fetchTariffEpics = (action$: Observable<any>): Observable<any> =>
  action$.pipe(
    // Фильтруем поток, пропуская только экшены запроса данных
    ofType<FetchTariffsRequestAction>(FETCH_TARIFFS_REQUEST),

    // Извлекаем строку поиска из payload экшена
    map((action) => action.payload.searchQuery),

    // Оптимизация: игнорируем, если пользователь ввел то же самое слово
    distinctUntilChanged(),

    // Оптимизация производительности: ждем 300мс паузы в наборе текста
    debounceTime(300),

    // Эффект переключения: отменяет прошлый незавершенный HTTP-запрос, если пошел новый
    switchMap((searchQuery) =>
      ajax.getJSON<any[]>(`${BASE_URL}?search=${encodeURIComponent(searchQuery)}`).pipe(
        // При успешном ответе генерируем экшен успеха
        map((response) => fetchTariffsSuccess(response)),

        // Важно: перехват ошибки внутри switchMap, чтобы не «уронить» глобальный поток экшенов
        catchError((error) =>
          of(fetchTariffsFailure(error.message || 'Не удалось загрузить тарифы t2')),
        ),
      ),
    ),
  );
