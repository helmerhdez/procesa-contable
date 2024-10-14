"use client";

import { MoreIcon, SortIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { generateZipOfReports } from "@/lib/data/reports";
import { formatDate } from "@/lib/utils";
import { Report } from "@/types/data/report-types";
import { ColumnDef } from "@tanstack/react-table";
import JSZip from "jszip";

export const columns: ColumnDef<Report>[] = [
  {
    id: "select",
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "dateCreation",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Fecha de creación
          <SortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{formatDate(row.getValue("dateCreation"), "es-ES")}</div>,
  },
  {
    accessorKey: "fileNames",
    header: "Archivos",
  },
  {
    accessorKey: "bills",
    header: "Facturas",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
      const handleDownload = async () => {
        const zip = new JSZip();
        try {
          const zipBlob = await generateZipOfReports(payment.fileNames);
          const url = window.URL.createObjectURL(zipBlob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Report - " + payment.id);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error(error);
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleDownload}>Descargar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
