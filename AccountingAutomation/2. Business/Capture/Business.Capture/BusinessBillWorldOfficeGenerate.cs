using API.Business;
using API.Models.Deserialize;
using Data;
using Models;
using System.Globalization;
using System.Text.RegularExpressions;

namespace Business.Capture
{
    public class BusinessBillWorldOfficeGenerate : BusinessBase
    {
        private readonly DataProductHomologation dataProductHomologation;
        public BusinessBillWorldOfficeGenerate(DataProductHomologation dataProductHomologation)
        {
            this.dataProductHomologation = dataProductHomologation;
        }

        public List<BillWorldOffice> Procces(BillDeserialize billDeserialize, String documentNumber)
        {
            List<ProductHomologation> productHomologations = dataProductHomologation.GetListByClient(documentNumber);
            List<BillWorldOffice> billsWorldOffice = new List<BillWorldOffice>();

            foreach (InvoiceLine invoiceLine in billDeserialize.InvoiceLines!)
            {
                BillWorldOffice billWorldOffice = new BillWorldOffice
                {
                    Name = billDeserialize.AccountingCustomerParty!.Party!.PartyName!.Name!,
                    DocumentType = "FC",
                    Date = DateTime.Parse(billDeserialize.IssueDate!).ToString("d/MM/yyyy"),
                    ExternalThird = Convert.ToInt32(billDeserialize.AccountingSupplierParty!.Party!.PartyLegalEntity!.CompanyID!.Value),
                    Note = "Factura de Compra",
                    PaymentMethod = "Credito",

                    //ProductName = invoiceLine.Item.StandardItemIdentification!.Id!,
                    Store = "Principal",
                    UnitOfMeasurement = invoiceLine.InvoicedQuantity.UnitCode == "NIU" ? "Und." : String.Empty,
                    Quantity = Int32.Parse(invoiceLine.InvoicedQuantity.Value!, NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture),
                    UnitAmount = Decimal.Parse(invoiceLine.Price.PriceAmount!, NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture),
                    DateExpiration = DateTime.Parse(billDeserialize.IssueDate!).ToString("d/MM/yyyy"),
                };

                String? productHomologation = productHomologations.LastOrDefault(p => p.ProductBillName == invoiceLine.Item.StandardItemIdentification?.Id)?.ProductUserName;

                if (String.IsNullOrEmpty(productHomologation))
                {
                    productHomologation = invoiceLine.Item.StandardItemIdentification!.Id!;
                }

                billWorldOffice.ProductName = productHomologation;

                if (invoiceLine.TaxTotal != null)
                {
                    billWorldOffice.IvaPercentage = Decimal.Parse(invoiceLine.TaxTotal.TaxSubtotal.TaxCategory.Percent,
                        NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture) / 100;
                }
                else
                {
                    billWorldOffice.IvaPercentage = 0;
                }

                billsWorldOffice.Add(billWorldOffice);
            }

            String pattern = @"\d+$";
            Match match = Regex.Match(billDeserialize!.Id!, pattern);
            billsWorldOffice.ForEach(b => b.DocumentNumber = Convert.ToInt32(match.Value));

            return billsWorldOffice;
        }
    }
}
