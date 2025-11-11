import Modal from "antd/es/modal"
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks"
import { selectSelectedUser } from "../store/userSelectors"
import { useCallback } from "react"
import { setSelectedUser } from "../store/userSlice"

export const UserModal = () => {
    const dispatch = useAppDispatch()
    const selectedUser = useAppSelector(selectSelectedUser)

    const onCancel = useCallback(() => {
        dispatch(setSelectedUser(undefined))
    }, [dispatch])

    return (
        <Modal
            title="Basic Modal"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={!!selectedUser}
            onCancel={onCancel}
            footer={null}
      >
        {selectedUser ? (
            <p>{selectedUser.name}</p>
        ): (
            <p>No user selected. How did you get here?</p>
        )}
      </Modal>
    )
}