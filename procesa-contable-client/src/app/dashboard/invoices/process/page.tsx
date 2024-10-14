"use client";
import { columns } from "@/app/dashboard/invoices/process/columns";
import PageHeader from "@/components/header/PageHeader";
import { DownloadIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { PAGE_SIZE } from "@/lib/constants";
import { fetchReportsByNit, generateZipOfReports } from "@/lib/data/reports";
import { getTotalPages } from "@/lib/utils";
import { ApiPagination } from "@/types/api-types";
import { PageProps } from "@/types/componets-types";
import { Report } from "@/types/data/report-types";
import { useEffect, useState } from "react";

const InvoiceProcessPage = ({ searchParams }: PageProps) => {
  const [reports, setReports] = useState<ApiPagination<Report[]>>({ pageItems: [], count: 0 });
  const [counterSelectedFiles, setCounterSelectedFiles] = useState<number>(0);
  const currentPage = Number(searchParams?.page) || 1;

  //TODO: Enviar query al api
  const query = searchParams?.query || "";
  let dataSelected: string[] = [];

  useEffect(() => {
    (async () => {
      const data = await fetchReportsByNit(currentPage, PAGE_SIZE);
      setReports(data);
    })();
  }, [currentPage]);

  const selectFile = (data: any[]) => {
    dataSelected = data.map((item) => item.original.fileNames).flat();
    setCounterSelectedFiles(data.length);
  };

  const handleDownload = async () => {
    try {
      const zipBlob = await generateZipOfReports(dataSelected);
      const url = window.URL.createObjectURL(zipBlob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Report - " + "All");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-4">
      <PageHeader className="py-6 flex justify-between" pageTitle="Facturas Procesadas" />
      <DataTable columns={columns} data={reports.pageItems} selectItem={selectFile} currentPage={currentPage} totalPages={getTotalPages(reports.count, PAGE_SIZE)}>
        <Button onClick={() => handleDownload()} disabled={!counterSelectedFiles} className="mr-2">
          <DownloadIcon className="w-4" />
          <span className="mx-2">Descargar</span>
          <small className="py-[1px] px-[8px] font-bold bg-accent rounded-full text-accent-foreground">{counterSelectedFiles}</small>
        </Button>
      </DataTable>
    </div>
  );
};

export default InvoiceProcessPage;
