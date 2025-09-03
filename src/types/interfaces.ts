/** API Chat endpoints interfaces */
export interface IMessages{
  chat_id: number,
  user_id: number,
  modified_at: string,
  created_at: string
};

export interface IGetMessagesResponse{
    user_id: number,
    chat_id: number,
    message_id: number,
    chat_created_at: string,
    username: string,
    question: string,
    response: string
};