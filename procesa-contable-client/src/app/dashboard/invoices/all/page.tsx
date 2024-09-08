"use client";
import PageHeader from "@/components/header/PageHeader";
import { DownloadIcon, UploadIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DragAndDropZone from "@/components/ui/drag-and-drop-zone";
import { deleteItemWithIndexFromList, getFileExtension } from "@/lib/utils";
import { Payment } from "@/types/componets-types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { columns } from "./columns";

const InvoiceAllPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const data: Payment[] = [];

  const [currentList, setCurrentList] = useState<Payment[]>([]);

  useEffect(() => {
    fetch("http://localhost:5047/Bill/List?pageNumber=1&pageSize=1", {})
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCurrentList(data);
        console.log(currentList);
      });
  }, []);

  const uploadFile = () => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = fetch("http://localhost:5047/File/Bill", {
        method: "POST",
        body: formData,
      });
    } catch (Exc) {}
  };

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
              <Button
                onClick={() => {
                  uploadFile();
                }}
                type="submit"
              >
                Cargar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button className="mr-2">
          <DownloadIcon className="w-4" />
          <span className="mx-2">Descargar</span>
          <small className="py-[1px] px-[8px] font-bold bg-accent rounded-full text-accent-foreground">0</small>
        </Button>
      </PageHeader>
      <DataTable columns={columns} data={currentList}></DataTable>
    </div>
  );
};

export default InvoiceAllPage;
