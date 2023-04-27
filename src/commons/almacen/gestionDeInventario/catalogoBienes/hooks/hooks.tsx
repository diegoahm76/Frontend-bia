import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../../../store/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const use_app_dispatch: DispatchFunc = useDispatch;
export const use_app_selector: TypedUseSelectorHook<RootState> = useSelector;
