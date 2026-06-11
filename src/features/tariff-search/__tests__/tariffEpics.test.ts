import { FETCH_TARIFFS_SUCCESS, fetchTariffsEpic, fetchTariffsRequest } from '@/entities';
import { type ActionsObservable, type StateObservable } from 'redux-observable';
import { of, Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { describe, expect, it } from 'vitest';

describe('Tariff Epic', () => {
  it('должен успешно обрабатывать запрос тарифов с дебаунсом', () => {
    // 1. Мокаем метод ajax.getJSON напрямую через spy/перезапись свойства.
    // Возвращаем чистый Observable (of), который RxJS гарантированно распознает.
    const mockResponse = [{ id: '1', name: 'Мой онлайн', price: 400, gb: 30, minutes: 400 }];
    ajax.getJSON = () => of(mockResponse);

    // 2. Создаем входной поток экшенов с поисковым запросом
    const action$ = of(fetchTariffsRequest('Мой онлайн')) as unknown as ActionsObservable<any>;

    // Создаем пустой стейт
    const state$ = new Subject() as unknown as StateObservable<any>;

    // 3. Вызываем наш эпик и подписываемся на результат выполнения
    fetchTariffsEpic(action$, state$, {}).subscribe((resultAction) => {
      // 4. Проверяем, что на выходе получили экшен успешной загрузки с правильными данными t2
      expect(resultAction.type).toBe(FETCH_TARIFFS_SUCCESS);
      expect(resultAction.payload).toHaveLength(1);
      expect(resultAction.payload[0].name).toBe('Мой онлайн');
    });
  });
});
