import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "../types/user"

type UserState = {
  cleanUsers: User[]
  cleanLoading: boolean
  cleanError: boolean
  dirtyUsers: User[]
  dirtyLoading: boolean
  dirtyError: boolean
}

export const initialState: UserState = {
  cleanUsers: [],
  cleanLoading: false,
  cleanError: false,
  dirtyUsers: [],
  dirtyLoading: false,
  dirtyError: false
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCleanUsers: (state: UserState, action: PayloadAction<User[]>) => {
      state.cleanUsers = action.payload
    },
    setCleanLoading: (state: UserState, action: PayloadAction<boolean>) => {
      state.cleanLoading = action.payload
    },
    setCleanError: (state: UserState, action: PayloadAction<boolean>) => {
      state.cleanError = action.payload
    },
    setDirtyUsers: (state: UserState, action: PayloadAction<User[]>) => {
      state.cleanUsers = action.payload
    },
    setDirtyLoading: (state: UserState, action: PayloadAction<boolean>) => {
      state.dirtyLoading = action.payload
    },
    setDirtyError: (state: UserState, action: PayloadAction<boolean>) => {
      state.dirtyError = action.payload
    },
  },
})

export const { 
  setCleanUsers,
  setCleanLoading,
  setCleanError,
  setDirtyUsers,
  setDirtyLoading,
  setDirtyError
} = userSlice.actions

export default userSlice.reducer
