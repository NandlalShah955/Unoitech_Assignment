// src/store.js
import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
  };
  
  // Create a simple reducer function
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return {
          ...state,
          value: state.value + 1,
        };
      case 'DECREMENT':
        return {
          ...state,
          value: state.value - 1,
        };
      case 'INCREMENT_BY_AMOUNT':
        return {
          ...state,
          value: state.value + action.payload,
        };
      default:
        return state;
    }
  };
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
