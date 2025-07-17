export const users: Array<{
  id: string
  userId: string
  password: string
  name: string
  signupTime: string
}> = [];

export const signupLogs: Array<{
  userId: string
  timestamp: string
  success: boolean
}> = []; 