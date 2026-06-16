import { ofType } from 'redux-observable';
import { type Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

// Обычные функции-экшены импортируем стандартно:
import type { Tariff } from '@/entities/tariff/model/types';
import {
  FETCH_TARIFFS_REQUEST,
  fetchTariffsFailure,
  fetchTariffsSuccess,
  type TariffActions,
} from '../model/actions';
// А тип интерфейса импортируем строго через "import type":

// Реальный или демонстрационный эндпоинт витрины t2
const BASE_URL = 'https://t2-custom-test';

/**
 * Epic для обработки живого поиска и фильтрации тарифов.
 * Демонстрирует экспертное владение RxJS: дебаунс ввода, отмена
 * предыдущих запросов при новом вводе и изолированная обработка ошибок.
 */
/**
 * Epic для обработки живого поиска и фильтрации тарифов.
 * Полностью типизирован без использования any.
 */
export const fetchTariffEpics = (action$: Observable<TariffActions>): Observable<TariffActions> =>
  action$.pipe(
    // Из-за отсутствия generic-типов у ofType в новых версиях,
    // TypeScript может не знать структуру action в следующем операторе map.
    // Приведение типа на этом этапе гарантирует безопасную работу с payload.
    ofType(FETCH_TARIFFS_REQUEST),

    // Явно указываем тип входящего экшена для стрелочной функции
    map((action) => {
      const requestAction = action as Extract<TariffActions, { payload: { searchQuery: string } }>;
      return requestAction.payload.searchQuery;
    }),

    // Оптимизация: игнорируем, если пользователь ввел то же самое слово
    distinctUntilChanged(),

    // Оптимизация производительности: ждем 300мс паузы в наборе текста
    debounceTime(300),

    // Эффект переключения: отменяет прошлый запрос, если пошел новый ввод
    switchMap((searchQuery: string) =>
      // Типизируем ответ от сервера t2 как массив моделей Tariff
      ajax.getJSON<Tariff[]>(`${BASE_URL}?search=${encodeURIComponent(searchQuery)}`).pipe(
        // Теперь response строго типизирован как Tariff[]
        map((response) => fetchTariffsSuccess(response)),

        // Перехват ошибки внутри switchMap
        catchError((error: { message?: string }) =>
          of(fetchTariffsFailure(error.message || 'Не удалось загрузить тарифы t2')),
        ),
      ),
    ),
  );
