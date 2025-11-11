export type User = {
  user_id: string | null | undefined
  name: string | null | undefined
  email: string | null | undefined
  instagram_handle: string | null | undefined
  tiktok_handle: string | null | undefined
  joined_at: string | null | undefined
  advocacy_programs: AdvocayProgram[] | null | undefined
}

type AdvocayProgram = {
  program_id: string | null | undefined
  brand: number | null | undefined
  tasks_completed: Task[] | null | undefined
  total_sales_attributed: string | null | undefined
}

type Task = {
  task_id: string | null | undefined
  platform: string | null | undefined
  post_url: string | null | undefined
  likes: string | number | null | undefined
  comments: number | null | undefined
  shares: number | null | undefined
  reach: number | null | undefined
}