import { useDispatch } from 'react-redux';
import { type AppDispatch } from './store';

// Кастомный хук, который знает про все экшены нашего приложения
export const useAppDispatch = () => useDispatch<AppDispatch>();
