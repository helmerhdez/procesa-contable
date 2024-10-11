"use client";
import { columns } from "@/app/dashboard/invoices/process/columns";
import PageHeader from "@/components/header/PageHeader";
import DataTable from "@/components/ui/data-table";
import { fetchReportsByNit } from "@/lib/data/reports";
import { Report } from "@/types/data/report-types";
import { useEffect, useState } from "react";

const InvoiceProcessPage = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchReportsByNit(1, 1);
        console.log(data);
        setReports(data);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    fetchData();
  }, []);

  const selectFile = (data: any[]) => {
    console.log("DOWNLOAD FILE");
  };

  return (
    <div className="px-4">
      <PageHeader className="py-6 flex justify-between" pageTitle="Facturas Procesadas" />
      <DataTable columns={columns} data={reports} selectItem={selectFile}></DataTable>
    </div>
  );
};

export default InvoiceProcessPage;
