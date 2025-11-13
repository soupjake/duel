import { useCallback, useMemo } from "react"
import Table from "antd/es/table"
import type { User } from "../types/user"
import { useAppDispatch } from "../hooks/storeHooks"
import { setSelectedUser } from "../store/userSlice"

type Props = {
    data: User[]
    loading: boolean
    error: boolean
}

export const UserTable = (props: Props) => {
    const { data, loading, error } = props
    const dispatch = useAppDispatch()

    const columns = useMemo(() => ([
        {
            title: "Id",
            dataIndex: "user_id",
            key: "user_id"
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Instagram",
            dataIndex: "instagram_handle",
            key: "instagram_handle"
        },
        {
            title: "TikTok",
            dataIndex: "tiktok_handle",
            key: "tiktok_handle"
        },
        {
            title: "Joined",
            dataIndex: "joined_at",
            key: "joined_at"
        },
    ]), [])

    const onRow = useCallback((user: User) => {
        return {
            onClick: () => {
                dispatch(setSelectedUser(user))
            }
        }
    }, [data, dispatch])

    if (error) {
        return <p>Error fetching users</p>
    }

    return (
        <Table
            style={{ 
                width: "100%",
                overflow: "scroll",
                background: "white"
            }}
            dataSource={data}
            columns={columns}
            loading={loading}
            onRow={onRow}
        />
    )
}