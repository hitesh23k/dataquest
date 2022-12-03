import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from "./reducers/user-reducer";


const store = configureStore({
  reducer: {
    userReducer:  userReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
