"use client";
import PageHeader from "@/components/header/PageHeader";
import { DownloadIcon, UploadIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DragAndDropZone from "@/components/ui/drag-and-drop-zone";
import { deleteItemWithIndexFromList, getFileExtension } from "@/lib/utils";
import { Payment } from "@/types/componets-types";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { columns } from "./columns";

const InvoiceAllPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const data: Payment[] = [
    { id: "1", amount: 1000, status: "pending", email: "email1@mail.com" },
    { id: "2", amount: 1500, status: "pending", email: "email2@mail.com" },
    { id: "3", amount: 800, status: "pending", email: "email3@mail.com" },
    { id: "4", amount: 2000, status: "pending", email: "email4@mail.com" },
    { id: "5", amount: 1200, status: "pending", email: "email5@mail.com" },
    { id: "6", amount: 900, status: "pending", email: "email6@mail.com" },
    { id: "7", amount: 3000, status: "pending", email: "email7@mail.com" },
    { id: "8", amount: 2500, status: "pending", email: "email8@mail.com" },
    { id: "9", amount: 1800, status: "pending", email: "email9@mail.com" },
    { id: "10", amount: 500, status: "pending", email: "email10@mail.com" },
    { id: "11", amount: 2200, status: "pending", email: "email11@mail.com" },
    { id: "12", amount: 1600, status: "pending", email: "email12@mail.com" },
    { id: "13", amount: 700, status: "pending", email: "email13@mail.com" },
    { id: "14", amount: 1300, status: "pending", email: "email14@mail.com" },
    { id: "15", amount: 1900, status: "pending", email: "email15@mail.com" },
    { id: "16", amount: 2400, status: "pending", email: "email16@mail.com" },
    { id: "17", amount: 2800, status: "pending", email: "email17@mail.com" },
    { id: "18", amount: 1100, status: "pending", email: "email18@mail.com" },
    { id: "19", amount: 1700, status: "pending", email: "email19@mail.com" },
    { id: "20", amount: 2600, status: "pending", email: "email20@mail.com" },
    { id: "21", amount: 1400, status: "pending", email: "email21@mail.com" },
    { id: "22", amount: 1000, status: "pending", email: "email22@mail.com" },
    { id: "23", amount: 1500, status: "pending", email: "email23@mail.com" },
    { id: "24", amount: 800, status: "pending", email: "email24@mail.com" },
    { id: "25", amount: 2000, status: "pending", email: "email25@mail.com" },
    { id: "26", amount: 1200, status: "pending", email: "email26@mail.com" },
    { id: "27", amount: 900, status: "pending", email: "email27@mail.com" },
    { id: "28", amount: 3000, status: "pending", email: "email28@mail.com" },
    { id: "29", amount: 2500, status: "pending", email: "email29@mail.com" },
    { id: "30", amount: 1800, status: "pending", email: "email30@mail.com" },
    { id: "31", amount: 500, status: "pending", email: "email31@mail.com" },
    { id: "32", amount: 2200, status: "pending", email: "email32@mail.com" },
    { id: "33", amount: 1600, status: "pending", email: "email33@mail.com" },
    { id: "34", amount: 700, status: "pending", email: "email34@mail.com" },
    { id: "35", amount: 1300, status: "pending", email: "email35@mail.com" },
    { id: "36", amount: 1900, status: "pending", email: "email36@mail.com" },
    { id: "37", amount: 2400, status: "pending", email: "email37@mail.com" },
    { id: "38", amount: 2800, status: "pending", email: "email38@mail.com" },
    { id: "39", amount: 1100, status: "pending", email: "email39@mail.com" },
    { id: "40", amount: 1700, status: "pending", email: "email40@mail.com" },
    { id: "41", amount: 2600, status: "pending", email: "email41@mail.com" },
    { id: "42", amount: 1400, status: "pending", email: "email42@mail.com" },
    { id: "43", amount: 1000, status: "pending", email: "email43@mail.com" },
    { id: "44", amount: 1500, status: "pending", email: "email44@mail.com" },
    { id: "45", amount: 800, status: "pending", email: "email45@mail.com" },
    { id: "46", amount: 2000, status: "pending", email: "email46@mail.com" },
    { id: "47", amount: 1200, status: "pending", email: "email47@mail.com" },
    { id: "48", amount: 900, status: "pending", email: "email48@mail.com" },
    { id: "49", amount: 3000, status: "pending", email: "email49@mail.com" },
    { id: "50", amount: 2500, status: "pending", email: "email50@mail.com" },
  ];

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: File[]) => {
    if (acceptedFiles?.length > 0) {
      setFiles((previusFiles: File[]) => [...previusFiles, ...acceptedFiles]);
    }
    if (rejectedFiles?.length > 0) {
      rejectedFiles.forEach((fileWrapper: any) => {
        const file = fileWrapper.file;
        toast.error(`El archivo ${getFileExtension(file.name)} no es permitido.`);
      });
    }
  }, []);

  const deleteFile = (fileId: number) => {
    console.log("Items deleted");
    setFiles(deleteItemWithIndexFromList(files, fileId));
  };

  const clearItems = () => {
    setFiles([]);
  };

  return (
    <div className="px-4">
      <PageHeader className="py-6 flex justify-between" pageTitle="Invoices - All">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mr-2">
              <UploadIcon className="mr-2 w-4" />
              Subir
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Subir facturas</DialogTitle>
            </DialogHeader>
            <DialogDescription>Seleccione los archivos XML de sus facturas.</DialogDescription>
            <DragAndDropZone
              id="dropzone-file"
              accept={{
                "application/xml": [],
                "text/xml": [],
              }}
              maxSize={5 * 1024 * 1024}
              subDescription="Sólo archivos .xml (MÁX. 5 MB)"
              onDrop={onDrop}
              deleteFile={deleteFile}
              files={files}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={clearItems}>
                  Cerrar
                </Button>
              </DialogClose>
              <Button type="submit">Cargar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button className="mr-2">
          <DownloadIcon className="w-4" />
          <span className="mx-2">Descargar</span>
          <small className="py-[1px] px-[8px] font-bold bg-accent rounded-full text-accent-foreground">0</small>
        </Button>
      </PageHeader>
      <DataTable columns={columns} data={data}></DataTable>
    </div>
  );
};

export default InvoiceAllPage;
