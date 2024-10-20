using Models;

namespace Data
{
    public class DataBills
    {
        private readonly AppDbContext appDbContext;

        public DataBills(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public Bill? Get(Int32 id)
        {
            return appDbContext.BILLS.FirstOrDefault(u => u.Id == id); ;
        }

        public List<Bill> GetListById(List<Int32> ids)
        {
            return appDbContext.BILLS.Where(b => ids.Contains(b.Id)).ToList();
        }

        public List<Bill> GetListByNit(String nit)
        {
            return appDbContext.BILLS.Where(b => b.Nit == nit).ToList();
        }

        public Bill Create(Bill bill)
        {
            appDbContext.BILLS.Add(bill);
            appDbContext.SaveChanges();

            return bill;
        }
    }
}
