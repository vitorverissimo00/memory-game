/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AxiosResponse<T = any> {
  config: any
  data: T
  headers: Record<string, string>
  status: number
  statusText: string
  request: any
}
