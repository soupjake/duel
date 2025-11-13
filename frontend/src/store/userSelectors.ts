import { createSelector } from "@reduxjs/toolkit";
import { createParametricSelectorHook } from "../hooks/storeHooks";
import type { RootState } from "./store";

export const selectUsers = (state: RootState) => state.user
export const selectCleanUsers = (state: RootState) => state.user.cleanUsers
export const selectCleanLoading = (state: RootState) => state.user.cleanLoading
export const selectCleanError = (state: RootState) => state.user.cleanError
export const selectDirtyUsers = (state: RootState) => state.user.dirtyUsers
export const selectDirtyLoading = (state: RootState) => state.user.dirtyLoading
export const selectDirtyError = (state: RootState) => state.user.dirtyError
export const selectSelectedUser = (state: RootState) => state.user.selectedUser
export const selectUserMetrics = (state: RootState) => state.user.metrics

export const selectUserById = createParametricSelectorHook(
    createSelector(
        [(state: RootState) => state.user.cleanUsers, (_, id: string) => id],
        (users, id) => users.find((user) => user.user_id === id)
    )
)
