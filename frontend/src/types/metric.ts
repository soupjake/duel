export type Metrics = {
  mostLiked: Metric
  mostCommented: Metric
  mostShared: Metric
}

export type Metric = {
  user_id: string
  value: number
}