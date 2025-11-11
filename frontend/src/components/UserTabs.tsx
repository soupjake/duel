import { useMemo } from "react"
import { Tabs } from "antd"
import { CleanUsers } from "./CleanUsers"
import { DirtyUsers } from "./DirtyUsers"

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
        ],
        []
    )

    return <Tabs defaultActiveKey="1" items={items} />
}
