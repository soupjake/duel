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
        <div>
           <p>{label}</p>
           <p>{`${user?.name}: ${metric.value}`}</p>
        </div>
    )
}