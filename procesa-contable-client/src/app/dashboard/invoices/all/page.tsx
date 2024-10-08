"use client";
import PageHeader from "@/components/header/PageHeader";
import { StartCogIcon, UploadIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DragAndDropZone from "@/components/ui/drag-and-drop-zone";
import { fetchInvoicesByNit, fetchProcessInvoicesByIds } from "@/lib/data/invoices";
import { deleteItemWithIndexFromList, getFileExtension } from "@/lib/utils";
import { Payment } from "@/types/componets-types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { columns } from "./columns";

const InvoiceAllPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  let dataSelected: number[] = [];
  const [counterSelectedFiles, setCounterSelectedFiles] = useState<number>(0);
  const [invoices, setInvoices] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInvoicesByNit(1, 1);
        setInvoices(data);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    fetchData();
  }, []);

  const uploadFile = () => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = fetch(`${process.env.ACCOUNTING_AUTOMATION_API_URL}/File/Bill`, {
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
    setFiles(deleteItemWithIndexFromList(files, fileId));
  };

  const clearItems = () => {
    setFiles([]);
  };

  const selectFile = (data: any[]) => {
    setCounterSelectedFiles(data.length);
    dataSelected = data.map((item) => item.original.id);
  };

  const proccessAllSelectedInvoices = async () => {
    toast.promise(fetchProcessInvoicesByIds(dataSelected), {
      loading: "Procesando las facturas seleccionadas...",
      success: () => {
        return `Facturas procesadas con éxito!`;
      },
      error: "Ocurrió un error al procesar las facturas.",
    });
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
        <Button onClick={() => proccessAllSelectedInvoices()} disabled={!counterSelectedFiles} className="mr-2">
          <StartCogIcon className="w-4" />
          <span className="mx-2">Procesar</span>
          <small className="py-[1px] px-[8px] font-bold bg-accent rounded-full text-accent-foreground">{counterSelectedFiles}</small>
        </Button>
      </PageHeader>
      <DataTable columns={columns} data={invoices} selectItem={selectFile}></DataTable>
    </div>
  );
};

export default InvoiceAllPage;
