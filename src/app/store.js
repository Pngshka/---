import { configureStore } from '@reduxjs/toolkit';
import gameReducer from '../features/counter/gameSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});
