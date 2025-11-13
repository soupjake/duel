import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "../store/store"
 
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const createParametricSelectorHook = <
    Result,
    Params extends readonly unknown[]
>(
    selector: (state: RootState, ...params: Params) => Result
) => {
    return (...args: Params) => {
        return useSelector((state: RootState) => selector(state, ...args));
    };
};