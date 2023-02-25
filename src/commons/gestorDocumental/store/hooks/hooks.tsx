import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux';
import type { RootState, AppDispatch } from '../store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch;
// eslint-disable-next-line @typescript-eslint/naming-convention
export const useAppDispatch: DispatchFunc = useDispatch;
// eslint-disable-next-line @typescript-eslint/naming-convention
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
