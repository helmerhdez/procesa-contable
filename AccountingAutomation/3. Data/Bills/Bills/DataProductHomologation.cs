using Models;

namespace Data
{
    public class DataProductHomologation
    {
        private readonly AppDbContext appDbContext;

        public DataProductHomologation(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public Boolean Exist(ProductHomologation productHomologation)
        {
            Boolean boolean = appDbContext.PRODUCT_HOMOLOGATIONS.Any(p =>
                p.ProductBillName == productHomologation.ProductBillName &&
                p.DocumentNumber == productHomologation.DocumentNumber
            );

            return boolean;
        }

        public Int32 Create(ProductHomologation productHomologation)
        {
            appDbContext.PRODUCT_HOMOLOGATIONS.Add(productHomologation);
            appDbContext.SaveChanges();

            return productHomologation.Id;
        }

        public List<ProductHomologation> GetListByBillId(Int32 billId)
        {
            List<ProductHomologation> productHomologations = appDbContext.PRODUCT_HOMOLOGATIONS.Where(p => p.BillId ==  billId).ToList();

            return productHomologations;
        }

        public List<ProductHomologation> GetListByClient(String documentNumber)
        {
            List<ProductHomologation> productHomologations = appDbContext.PRODUCT_HOMOLOGATIONS
                .Where(p => p.DocumentNumber == documentNumber).ToList();

            return productHomologations;
        }

        public Boolean Update(List<ProductHomologation> productHomologations)
        {
            appDbContext.PRODUCT_HOMOLOGATIONS.UpdateRange(productHomologations);
            appDbContext.SaveChanges();

            return true;
        }
    }
}
