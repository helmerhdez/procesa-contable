export type ApiResponse<T> = {
    success: boolean,
    data?: T,
    error?: ErrorApiResponse
}

type ErrorApiResponse = {
    code: string,
    status: number,
    message: string,
    timestamp: string
}