import { MoreIcon } from "@/components/icons";
import { EditProducts } from "@/components/invoices/edit-products";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { fetchProcessInvoicesByIds } from "@/lib/data/invoices";
import { fetchProductByInvoiceId } from "@/lib/data/products";
import { Payment } from "@/types/componets-types";
import { Product } from "@/types/data/product-types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ActionsCell = ({ payment }: { payment: Payment }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProductByInvoiceId(parseInt(payment.id)).then((result) => {
      setProducts(result);
    });
  }, [payment.id]);

  const handleProccessInvoice = () => {
    const paymentIds: number[] = [];
    paymentIds.push(parseInt(payment.id));

    toast.promise(fetchProcessInvoicesByIds(paymentIds), {
      loading: "Procesando las facturas seleccionadas...",
      success: () => {
        return `Facturas procesadas con éxito!`;
      },
      error: "Ocurrió un error al procesar las facturas.",
    });
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
        <DropdownMenuItem onClick={() => handleProccessInvoice()}>Procesar</DropdownMenuItem>
        <EditProducts products={products}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Editar productos</DropdownMenuItem>
        </EditProducts>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsCell;
