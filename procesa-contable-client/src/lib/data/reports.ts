import { buildFileDownload, buildReportByNitApiUrl } from "@/lib/accounting-api-constants";
import { ApiPagination } from "@/types/api-types";
import { Report } from "@/types/data/report-types";
import JSZip from "jszip";

export const fetchReportsByNit = async (pageNumber: number, pageSize: number): Promise<ApiPagination<Report[]>> => {
    try {
        console.log(buildReportByNitApiUrl(pageNumber, pageSize))
        const response = await fetch(buildReportByNitApiUrl(pageNumber, pageSize), {
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

export const generateZipOfReports = async (fileNames: string[]): Promise<Blob> => {
    const zip = new JSZip();

    try {
        console.log(fileNames)
        await Promise.all(
            fileNames.map(async (fileName: string) => {
                const response = await fetchReportsDownload(fileName);
                zip.file(fileName, response, { base64: true });
            })
        );

        const content = await zip.generateAsync({ type: "blob" });
        return content;
    } catch (error) {
        console.error('Error generating ZIP:', error);
        throw new Error('Failed to generate ZIP.');
    }
}