import { buildProductsApiUrl, buildSaveProductsApiUrl } from "@/lib/accounting-api-constants";
import { Product } from "@/types/data/product-types";

export const fetchProductByInvoiceId = async (invoiceId: number) => {
    try {
        const response = await fetch(buildProductsApiUrl(invoiceId), {
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

}

export const fetchProductsSave = async (products: Product[]) => {
    try {
        const response = await fetch(buildSaveProductsApiUrl(), {
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            method: "POST",
            body: JSON.stringify(products)
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

}