import { useAppSelector } from "../hooks/storeHooks"
import { 
    selectCleanError,
    selectCleanLoading,
    selectCleanUsers
} from "../store/userSelectors"
import { UserTable } from "./UserTable"

export const CleanUsers = () => {
    const users = useAppSelector(selectCleanUsers)
    const loading = useAppSelector(selectCleanLoading)
    const error = useAppSelector(selectCleanError)

    return (
        <UserTable data={users} loading={loading} error={error} />
    )
}