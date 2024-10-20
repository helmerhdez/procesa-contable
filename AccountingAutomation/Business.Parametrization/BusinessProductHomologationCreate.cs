using API.Models.Deserialize;
using Data;
using Models;
using System.Text.RegularExpressions;

namespace Business.Parametrization
{
    public class BusinessProductHomologationCreate
    {
        private readonly DataProductHomologation dataProductHomologation;

        public BusinessProductHomologationCreate(DataProductHomologation dataProductHomologation)
        {
            this.dataProductHomologation = dataProductHomologation;
        }

        public void ProductHomologationCreate(BillDeserialize billDeserialize, Int32 billId)
        {
            foreach (InvoiceLine invoiceLine in billDeserialize.InvoiceLines!)
            {
                ProductHomologation productHomologation = new ProductHomologation
                {
                    DocumentNumber = billDeserialize.AccountingCustomerParty!.Party!.PartyLegalEntity!.CompanyID!.Value!,
                    ProviderDocumentNumber = billDeserialize.AccountingSupplierParty!.Party!.PartyLegalEntity!.CompanyID!.Value!,
                    ProductBillName = invoiceLine.Item.StandardItemIdentification!.Id!,
                    ProductUserName = String.Empty,
                    ProductUserDescription = String.Empty,
                    BillId = billId
                };

                String pattern = @"\d+$";
                Match match = Regex.Match(billDeserialize!.Id!, pattern);
                productHomologation.Bill = Convert.ToInt32(match.Value);

                if (dataProductHomologation.Exist(productHomologation) == false)
                {
                    dataProductHomologation.Create(productHomologation);
                }
            }
        }
    }
}
