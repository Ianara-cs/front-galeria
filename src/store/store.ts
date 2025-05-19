import { configureStore } from '@reduxjs/toolkit'

import commentReducer from './reducers/commentReducer'
import globalReducer from './reducers/globalReducer'
import userReducer from './reducers/userReducer'

export const store = configureStore({
  reducer: {
    globalReducer,
    userReducer,
    commentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
