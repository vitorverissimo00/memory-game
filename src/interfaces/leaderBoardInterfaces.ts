export interface LeaderBoardInterface {
  id: string
  date: string
  name: string
  score: string
}

export interface LeaderBoardResponseInterface {
  data: LeaderBoardInterface[]
  success: boolean
  message: string
}
