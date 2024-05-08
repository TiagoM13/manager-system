import { Status, UserTypes } from "../enums"

export interface User {
  id: number
  name: string
  email: string
  image_url: string
  user_type: UserTypes
  status: Status
  created_at: Date
  last_access: Date
}
