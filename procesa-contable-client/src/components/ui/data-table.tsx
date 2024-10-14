"use client";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WAIT_BETWEEN_SEARCH } from "@/lib/constants";
import { DataTableProps } from "@/types/componets-types";
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const DataTable = <TData, TValue>({ columns, data, selectItem, children, currentPage, totalPages }: DataTableProps<TData, TValue>) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  useEffect(() => {
    selectItem(table.getFilteredSelectedRowModel().rows);
  }, [rowSelection, selectItem, table]);

  const handleSearch = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const term: string = event.target.value;
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    params.set("size", "1");
    replace(`${pathName}?${params.toString()}`);
  }, WAIT_BETWEEN_SEARCH);

  const handlePagination = (page: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathName}?${params.toString()}`;
  };

  return (
    <>
      <div className="flex items-center justify-end py-4">
        {/* <Input type="email" onChange={(event) => handleSearch(event)} defaultValue={searchParams.get("query")?.toString()} placeholder="Buscar por email" className="max-w-sm" /> */}
        <div>{children}</div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sin resultados...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" disabled={currentPage <= 1}>
            <Link href={handlePagination(currentPage - 1)}>Anterior</Link>
          </Button>
          <Button variant="outline" size="sm" disabled={currentPage === totalPages}>
            <Link href={handlePagination(currentPage + 1)}>Siguiente</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default DataTable;
