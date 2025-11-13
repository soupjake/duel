import { useMemo } from "react"
import { Tabs } from "antd"
import { CleanUsers } from "./CleanUsers"
import { DirtyUsers } from "./DirtyUsers"
import { UserMetrics } from "./UserMetrics"

export const UserTabs = () => {
    const items = useMemo(
        () => [
            {
                key: "1",
                label: "Clean Users",
                children: <CleanUsers />,
            },
            {
                key: "2",
                label: "Dirty Users",
                children: <DirtyUsers />,
            },
            {
                key: "3",
                label: "User Metrics",
                children: <UserMetrics />,
            },
        ],
        []
    )

    return <Tabs defaultActiveKey="1" items={items} />
}
