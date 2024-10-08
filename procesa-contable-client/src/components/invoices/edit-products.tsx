import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchProductsSave } from "@/lib/data/products";
import { EditProductsDialogType } from "@/types/children-type";
import { Product } from "@/types/data/product-types";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const EditProducts = ({ children, products }: EditProductsDialogType) => {
  const [newProducts, setNewProducts] = useState(products);

  const handleProductChange = (id: number, field: keyof Product, value: string) => {
    setNewProducts((prevProducts) => prevProducts.map((product) => (product.id === id ? { ...product, [field]: value, isEdited: true } : product)));
  };

  const handleSaveProducts = async () => {
    toast.promise(fetchProductsSave(newProducts), {
      loading: "Guardando...",
      success: () => {
        return `Guardado con exito`;
      },
      error: "Error al guardar. Vuelva a intentarlo",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[70vw] max-h-[80vh] overflow-auto" aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>Editar productos</DialogTitle>
          <DialogDescription>Ingrese o edite los valores, luego de click en guardar</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Nombre factura</TableHead>
                <TableHead className="w-[35%]">Usuario</TableHead>
                <TableHead className="w-[35%]">Descripción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.productBillName}</TableCell>
                  <TableCell>
                    <Input id="productUserName" onChange={(e) => handleProductChange(product.id, "productUserName", e.target.value)} defaultValue={product.productUserName} className="col-span-3" />
                  </TableCell>
                  <TableCell>
                    <Input id="productUserDescription" onChange={(e) => handleProductChange(product.id, "productUserDescription", e.target.value)} defaultValue={product.productUserDescription} className="col-span-3" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cerrar
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSaveProducts}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
