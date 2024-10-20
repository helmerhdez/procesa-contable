using API.Business;
using API.Models.Deserialize;
using Data;
using Models;

namespace Business.Capture
{
    public class BusinessProductWOParametricGenerate : BusinessBase
    {
        private readonly DataProductHomologation dataProductHomologation;

        public BusinessProductWOParametricGenerate(DataProductHomologation dataProductHomologation)
        {
            this.dataProductHomologation = dataProductHomologation;
        }

        public List<ProductWOGenerate> Procces(List<InvoiceLine> invoiceLines, String documentNumber)
        {
            List<ProductHomologation> productHomologations = dataProductHomologation.GetListByClient(documentNumber);
            List<ProductWOGenerate> productsWOGenerate = new List<ProductWOGenerate>();

            foreach (InvoiceLine invoiceLine in invoiceLines)
            {
                ProductWOGenerate productWOGenerate = new ProductWOGenerate
                {
                    //Code = Guid.NewGuid().ToString(),
                    //Description = invoiceLine.Item.Description!,

                    Active = -1,
                    MaxQuantity = 999999,
                    MinQuantity = 0,
                    Price = Decimal.Parse(invoiceLine.Price.PriceAmount!),
                    GroupOne = String.Empty,
                    Iva = Decimal.Parse(invoiceLine.TaxTotal?.TaxSubtotal?.TaxCategory?.Percent ?? "0") / 100,
                    TypeIva = Decimal.Parse(invoiceLine.TaxTotal?.TaxAmount ?? "0") > 0 ? "Gravado" : "Exento",
                    Clasification = "Producto",
                    ClasificationNiif = "Producto",
                    Product = -1,
                    BillOutOfStock = 0,
                    ReorderQuantity = 0,
                    UnitOfMeasurement = "Und."
                };

                ProductHomologation? productHomologation = productHomologations.LastOrDefault(p => p.ProductBillName == invoiceLine.Item.StandardItemIdentification?.Id);

                if (String.IsNullOrEmpty(productHomologation?.ProductUserName))
                {
                    productWOGenerate.Code = invoiceLine.Item.StandardItemIdentification!.Id!;
                }
                else
                {
                    productWOGenerate.Code = productHomologation.ProductUserName;
                }

                if (String.IsNullOrEmpty(productHomologation?.ProductUserDescription))
                {
                    productWOGenerate.Description = invoiceLine.Item.Description!;
                }
                else
                {
                    productWOGenerate.Description = productHomologation.ProductUserDescription!;
                }

                productsWOGenerate.Add(productWOGenerate);
            }

            return productsWOGenerate;
        }
    }
}
