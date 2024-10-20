using Models;

namespace Data
{
    public class DataReports
    {
        private readonly AppDbContext appDbContext;

        public DataReports(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public Report? Get(Int32 id)
        {
            return appDbContext.REPORTS.FirstOrDefault(u => u.Id == id); ;
        }

        public List<Report> GetListById(List<Int32> ids)
        {
            return appDbContext.REPORTS.Where(r => ids.Contains(r.Id)).ToList();
        }

        public List<Report> GetListByDocumentNumber(String documentNumber)
        {
            return appDbContext.REPORTS.Where(r => r.DocumentNumber == documentNumber).ToList();
        }

        public Report Create(Report report)
        {
            appDbContext.REPORTS.Add(report);
            appDbContext.SaveChanges();

            return report;
        }
    }
}
