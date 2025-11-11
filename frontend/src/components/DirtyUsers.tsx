import { useAppSelector } from "../hooks/storeHooks"
import { 
    selectDirtyError,
    selectDirtyLoading,
    selectDirtyUsers
} from "../store/userSelectors"
import { UserTable } from "./UserTable"

export const DirtyUsers = () => {
    const users = useAppSelector(selectDirtyUsers)
    const loading = useAppSelector(selectDirtyLoading)
    const error = useAppSelector(selectDirtyError)

    return (
        <UserTable data={users} loading={loading} error={error} />
    )
}