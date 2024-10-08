export const BASE_ACCOUNTING_AUTOMATION_URL_API = "http://localhost:5047";

export const buildInvoicesByNitApiUrl = (pageNumber: number, pageSize: number): string => {
    return BASE_ACCOUNTING_AUTOMATION_URL_API + `/Bill/List?pageNumber=${pageNumber}&pageSize=${pageSize}`
}

export const buildInvoicesSave = (): string => {
    return BASE_ACCOUNTING_AUTOMATION_URL_API + `/Bill/Proccess`
}

export const buildProductsApiUrl = (invoiceId: number): string => {
    return BASE_ACCOUNTING_AUTOMATION_URL_API + `/Product/GetListByBill?billId=${invoiceId}`
}

export const buildSaveProductsApiUrl = (): string => {
    return BASE_ACCOUNTING_AUTOMATION_URL_API + `/Product`
}