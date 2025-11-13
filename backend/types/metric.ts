export type Metrics = {
  mostLiked: Metric
  mostCommented: Metric
  mostShared: Metric
}

type Metric = {
  user_id: string
  value: number
}