"use client";
import { columns } from "@/app/dashboard/invoices/upload/columns";
import PageHeader from "@/components/header/PageHeader";
import { StartCogIcon, UploadIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DragAndDropZone from "@/components/ui/drag-and-drop-zone";
import { PAGE_SIZE } from "@/lib/constants";
import { fetchInvoicesByNit, fetchInvoicesUpload, fetchProcessInvoicesByIds } from "@/lib/data/invoices";
import { deleteItemWithIndexFromList, getFileExtension, getTotalPages } from "@/lib/utils";
import { ApiPagination } from "@/types/api-types";
import { PageProps, Payment } from "@/types/componets-types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const InvoiceUploadPage = ({ searchParams }: PageProps) => {
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";
  const [files, setFiles] = useState<File[]>([]);
  let dataSelected: number[] = [];
  const [counterSelectedFiles, setCounterSelectedFiles] = useState<number>(0);
  const [invoices, setInvoices] = useState<ApiPagination<Payment[]>>({ pageItems: [], count: 0 });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchInvoicesByNit(currentPage, PAGE_SIZE);
        setInvoices(data);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    fetchData();
  }, [currentPage]);

  const uploadFile = async () => {
    if (files.length > 0) {
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      toast.promise(fetchInvoicesUpload(formData), {
        loading: "Cargando facturas...",
        success: async () => {
          const data = await fetchInvoicesByNit(currentPage, PAGE_SIZE);
          setInvoices(data);
          setOpen(false);
          return `Facturas cargadas con éxito.`;
        },
        error: "Ocurrió un error al cargar las facturas",
      });
    } else {
      toast.warning("No se seleccionaron facturas para subir.");
    }
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
    setOpen(false);
  };

  const selectFile = (data: any[]) => {
    setCounterSelectedFiles(data.length);
    dataSelected = data.map((item) => item.original.id);
  };

  const proccessAllSelectedInvoices = async () => {
    if (dataSelected.length > 0) {
      toast.promise(fetchProcessInvoicesByIds(dataSelected), {
        loading: "Procesando las facturas seleccionadas...",
        success: () => {
          return `Facturas procesadas con éxito!`;
        },
        error: "Ocurrió un error al procesar las facturas.",
      });
    }
  };

  return (
    <div className="px-4">
      <PageHeader className="py-6 flex justify-between" pageTitle="Facturas por Procesar" />
      <DataTable columns={columns} data={invoices.pageItems} selectItem={selectFile} currentPage={currentPage} totalPages={getTotalPages(invoices.count, PAGE_SIZE)}>
        <Dialog open={open} onOpenChange={setOpen}>
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
              <Button type="button" variant="outline" onClick={clearItems}>
                Cerrar
              </Button>
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
      </DataTable>
    </div>
  );
};

export default InvoiceUploadPage;
