import { FETCH_TARIFFS_SUCCESS, fetchTariffsEpic, fetchTariffsRequest } from '@/entities';
import { of, Subject, type Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { describe, expect, it } from 'vitest';

describe('Tariff Epic', () => {
  it('должен успешно обрабатывать запрос тарифов с дебаунсом', () => {
    // 1. Мокаем метод ajax.getJSON напрямую.
    const mockResponse = [{ id: '1', name: 'Мой онлайн', price: 400, gb: 30, minutes: 400 }];
    ajax.getJSON = () => of(mockResponse);

    // 2. Используем базовый тип Observable из rxjs, который на 100% совместим
    const action$ = of(fetchTariffsRequest('Мой онлайн')) as unknown as Observable<any>;
    const state$ = new Subject() as unknown as Observable<any>;

    // 3. Вызываем наш эпик и подписываемся на результат выполнения
    fetchTariffsEpic(action$, state$, {}).subscribe((resultAction) => {
      // 4. Проверяем экшен успеха и данные тарифа t2
      expect(resultAction.type).toBe(FETCH_TARIFFS_SUCCESS);
      expect(resultAction.payload).toHaveLength(1);
      expect(resultAction.payload[0].name).toBe('Мой онлайн');
    });
  });
});
