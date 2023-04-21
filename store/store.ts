import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducer";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { useDispatch } from "react-redux";
import { apiCallSaga } from "./middleware";

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: reducers,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(apiCallSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
