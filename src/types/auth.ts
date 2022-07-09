export interface ITokenSuccess {
  success: boolean,
  expires_at: string,
  guest_session_id: string
}

export interface IResponse {
  status_message: string,
  status_code: number
}
