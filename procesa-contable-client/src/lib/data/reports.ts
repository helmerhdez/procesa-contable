import { Report } from "@/types/data/report-types";
import { buildFileDownload, buildReportByNitApiUrl } from "../accounting-api-constants";

export const fetchReportsByNit = async (pageNumber: number, pageSize: number): Promise<Report[]> => {
    try {
        const response = await fetch(buildReportByNitApiUrl(pageNumber, pageSize), {
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.pageItems;
    } catch (error) {
        console.error('Fetch failed: ', error);
        throw new Error('Failed to fetch invoices data.');
    }
};

export const fetchReportsDownload = async (fileName: string): Promise<string> => {
    try {
        const response = await fetch(buildFileDownload(fileName), {
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Fetch failed: ', error);
        throw new Error('Failed to fetch invoices data.');
    }
};