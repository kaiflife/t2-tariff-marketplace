// Описываем сущность тарифа t2
export interface Tariff {
  id: string;
  name: string;
  price: number;
  gb: number;
  minutes: number;
  isPopular?: boolean;
}

// Описываем состояние среза (slice) тарифов в Redux
export interface TariffState {
  list: Tariff[];
  loading: boolean;
  error: string | null;
}
