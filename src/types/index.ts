export type ResponseType = Promise<{
  message?: string;
  success: boolean;
  data?: Record<string, string | number>;
  token?: string;
}>;
