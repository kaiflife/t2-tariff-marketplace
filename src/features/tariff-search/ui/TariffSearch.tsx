import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/app/hooks';
import { fetchTariffsRequest, selectTariffsList, selectTariffsLoading } from '@/entities';
import './tariff-search.scss';

export const TariffSearch = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');

  const tariffs = useSelector(selectTariffsList);
  const isLoading = useSelector(selectTariffsLoading);

  // Оптимизируем обработчик ввода через useCallback
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  // Триггерим экшен при изменении локального стейта ввода
  useEffect(() => {
    dispatch(fetchTariffsRequest(input));
  }, [input, dispatch]);

  return (
    <div className="tariff-search-container">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Поиск тарифа (например, Мой онлайн)..."
        className="tariff-search-input"
      />

      {isLoading && <div className="loader">Загрузка актуальных тарифов t2...</div>}

      <div className="tariffs-grid">
        {tariffs.map((tariff) => (
          <div key={tariff.id} className="tariff-card">
            <h3>{tariff.name}</h3>
            <p>
              {tariff.gb} ГБ · {tariff.minutes} мин
            </p>
            <span className="price">{tariff.price} ₽/мес</span>
          </div>
        ))}
      </div>
    </div>
  );
};
