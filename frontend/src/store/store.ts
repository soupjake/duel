import { configureStore, combineReducers, type ThunkAction, type Action } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
