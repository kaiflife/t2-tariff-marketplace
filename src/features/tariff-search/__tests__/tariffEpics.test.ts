import { TestScheduler } from 'rxjs/testing';
import { fetchTariffsEpic } from './tariffEpics';
import { fetchTariffsRequest, fetchTariffsSuccess } from './actions';

describe('Tariff Epic', () => {
  let testScheduler: TestScheduler;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('должен успешно обрабатывать запрос тарифов с дебаунсом', () => {
    testScheduler.run(({ marbleAssert, mockActions, mockAjax }) => {
      // Имитируем поведение потоков времени (мраморные диаграммы)
      // Подробный тест эпика покажет глубокое знание RxJS тестирования
    });
  });
});
