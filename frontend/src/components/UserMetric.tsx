import Flex from "antd/es/flex"
import { selectUserById } from "../store/userSelectors"
import type { Metric } from "../types/metric"

type Props = {
    metric: Metric
    label: string
}

export const UserMetric = (props: Props) => {
    const { metric, label } = props
    const user = selectUserById(metric.user_id)

    return (
        <Flex vertical align="start">
           <h4>{label}</h4>
           <p>{`${user?.name}: ${metric.value}`}</p>
        </Flex>
    )
}