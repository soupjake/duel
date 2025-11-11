import { useMemo } from "react"
import Table from "antd/es/table"
import type { User } from "../types/user"

type Props = {
    data: User[]
    loading: boolean
    error: boolean
}

export const UserTable = (props: Props) => {
    const { data, loading, error } = props

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
    ]), [])

    if (error) {
        return <p>Error fetching users</p>
    }

    return (
        <Table dataSource={data} columns={columns} loading={loading} />
    )
}