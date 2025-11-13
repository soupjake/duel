import { useAppSelector } from "../hooks/storeHooks"
import { selectUserMetrics } from "../store/userSelectors"
import { UserMetric } from "./UserMetric"

export const UserMetrics = () => {
    const userMetrics = useAppSelector(selectUserMetrics)

    if (!userMetrics) {
        return null
    }

    return (
        <div>
            <UserMetric 
                metric={userMetrics.mostLiked}
                label="Most liked:"
            />
            <UserMetric
                metric={userMetrics.mostCommented}
                label="Most commented:"
            />
            <UserMetric
                metric={userMetrics.mostShared}
                label="Most shared:"
            />
        </div>
    )
}