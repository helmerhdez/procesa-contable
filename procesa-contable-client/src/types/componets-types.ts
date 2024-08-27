import { ColumnDef } from "@tanstack/react-table";

export type DragAndDropZoneProps = {
    id: string;
    accept?: {};
    maxSize?: number;
    maxFiles?: number;
    subDescription?: string;
    className?: string;
    files?: File[];
    onDrop?: (acceptedFiles: any, rejectedFiles: any) => void
    deleteFile: (index: number) => void;
};

export type FileItemProps = {
    fileName?: string;
    fileSize?: number;
    index: number;
    deleteFile: (index: number) => void;
}

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}