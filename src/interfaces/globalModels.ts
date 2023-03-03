export interface ResponseThunks<T = any | null>{
  ok: boolean,
  data?: T,
  error_message?: string 
}

export interface ResponseServer<T> {
  success: boolean;
  detail: string;
  data: T;
}