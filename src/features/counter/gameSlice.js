import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {states} from './Game.js'

const initialState = {
  status: 'loadingManifest',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    nextState: (state) => {
      if (state.status === "playing") return;
      //debugger;
      const realNextState = states[state.status].nextState;
      state.status = realNextState;
      console.log(state.status);
         ///state.status =  // state.status;states
    },
    // loadingManifest: (state) => {
    //   state.status = 'loadingManifest';
    // },
    // // loadingAssets: (state) => {
    // //     state.status = 'loadingAssets';
    // // },
    // initialization: (state) => {
    //   state.status = 'initialization';
    // },
    // initLevel: (state) => {
    //   state.status = 'initLevel';
    // },
    // playing: (state) => {
    //   state.status = 'playing';
    // },
  },

});

export const { nextState } = gameSlice.actions;

// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state: RootState) => state.game.status)`
export const selectState = (state) => state.game.status;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//     const currentValue = selectState(getState());
//     if (currentValue % 2 === 1) {
//         dispatch(incrementByAmount(amount));
//     }
// };

export default gameSlice.reducer;
