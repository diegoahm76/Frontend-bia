import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const use_app_dispatch = () => useDispatch<AppDispatch>();
export const use_app_selector: TypedUseSelectorHook<RootState> = useSelector;
