export type ApiResponse<T> = {
    success: boolean,
    data?: T,
    error?: ErrorApiResponse
}

export type ApiPagination<T> = {
    pageItems: T
    count: number
}

type ErrorApiResponse = {
    code: string,
    status: number,
    message: string,
    timestamp: string
}