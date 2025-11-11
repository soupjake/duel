import { getCleanUsers, getDirtyUsers } from "../services/userService"
import type { AppThunk } from "./store"
import { selectUsers } from "./userSelectors"
import {
  setCleanError,
  setCleanLoading,
  setCleanUsers,
  setDirtyError,
  setDirtyLoading,
  setDirtyUsers,
} from "./userSlice"

export const fetchUsers = (): AppThunk => async (dispatch) => {
  await dispatch(fetchCleanUsers())
  dispatch(fetchDirtyUsers())
}

export const fetchCleanUsers =
  (): AppThunk<Promise<boolean>> => async (dispatch, getState) => {
    const { cleanUsers, cleanLoading } = selectUsers(getState())

    if (!cleanUsers.length && !cleanLoading) {
      dispatch(setCleanLoading(true))

      try {
        const data = await getCleanUsers()

        if (data) {
          dispatch(setCleanUsers(data))
        }
      } catch (e) {
        console.log(e)
        dispatch(setCleanError(true))
      }

      dispatch(setCleanLoading(false))
    }

    return true
  }

export const fetchDirtyUsers =
  (): AppThunk => async (dispatch, getState) => {
    const { dirtyUsers, cleanLoading } = selectUsers(getState())

    if (!dirtyUsers.length && !cleanLoading) {
      dispatch(setDirtyLoading(true))

      try {
        const data = await getDirtyUsers()

        if (data) {
          dispatch(setDirtyUsers(data))
        }
      } catch (e) {
        console.log(e)
        dispatch(setDirtyError(true))
      }

      dispatch(setDirtyLoading(false))
    }
  }
