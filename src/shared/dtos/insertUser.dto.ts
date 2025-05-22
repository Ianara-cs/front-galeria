export interface InsertUser {
  first_name: string
  last_name: string
  email: string
  password?: string
  passwordAgain?: string
  username: string
  is_staff: boolean
  is_active: boolean
}
