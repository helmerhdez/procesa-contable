import { Payment } from "@/types/componets-types";

export const fetchInvoicesByNit = async (pageNumber: number, pageSize: number): Promise<Payment[]> => {
    try {
        const response = await fetch(`http://localhost:5047/Bill/List?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
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

export const process = (payment: Payment[]) => {

}