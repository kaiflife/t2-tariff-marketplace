import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { map, switchMap, debounceTime, catchError, distinctUntilChanged } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { 
  FETCH_TARIFFS_REQUEST, 
  fetchTariffsSuccess, 
  fetchTariffsFailure,
  FetchTariffsRequestAction 
} from './actions';

// Имитируем API-эндпоинт для поиска тарифов t2
const BASE_URL = 'https://t2-digital.ru';

export const fetchTariffsEpic = (
  action$: Observable<any>
): Observable<any> =>
  action$.pipe(
    // Перехватываем только экшены запроса тарифов
    ofType<FetchTariffsRequestAction>(FETCH_TARIFFS_REQUEST),
    // Достаем поисковую строку из экшена
    map(action => action.payload.searchQuery),
    // Избегаем повторных запросов с тем же текстом
    distinctUntilChanged(),
    // Ждем 300мс после последнего ввода пользователя
    debounceTime(300),
    // Переключаемся на AJAX-запрос. Если придет новый ввод, старый запрос отменится автоматически
    switchMap((query) =>
      ajax.getJSON<any[]>(`${BASE_URL}?search=${encodeURIComponent(query)}`).pipe(
        map(response => fetchTariffsSuccess(response)),
        // Важно: catchError должен быть внутри switchMap, чтобы не «убить» корневой стрим эпика
        catchError(error => of(fetchTariffsFailure(error.message || 'Ошибка загрузки тарифов')))
      )
    )
  );
