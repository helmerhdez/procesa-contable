import { buildInvoicesByNitApiUrl, buildInvoicesSave, buildInvoicesUpload } from "@/lib/accounting-api-constants";
import { ApiPagination } from "@/types/api-types";
import { Payment } from "@/types/componets-types";

export const fetchInvoicesByNit = async (pageNumber: number, pageSize: number): Promise<ApiPagination<Payment[]>> => {
    try {
        const response = await fetch(buildInvoicesByNitApiUrl(pageNumber, pageSize), {
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch failed: ', error);
        throw new Error('Failed to fetch invoices data.');
    }
};

export const fetchProcessInvoicesByIds = async (payment: number[]) => {
    try {
        const response = await fetch(buildInvoicesSave(), {
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(payment)
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch failed: ', error);
        throw new Error('Failed to fetch invoices data.');
    }
};

export const fetchInvoicesUpload = async (formData: FormData): Promise<Payment[]> => {
    try {
        const response = await fetch(buildInvoicesUpload(), {
            credentials: 'include',
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch failed: ', error);
        throw new Error('Failed to upload invoice.');
    }
};