using Models;

namespace Data
{
    public class DataReportFile
    {
        private readonly AppDbContext appDbContext;

        public DataReportFile(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public Boolean Create(ReportFile reportFile)
        {
            appDbContext.REPORT_FILES.Add(reportFile);
            appDbContext.SaveChanges();

            return true;
        }

        public ReportFile Get(String id)
        {
            ReportFile reportFile = appDbContext.REPORT_FILES.FirstOrDefault(r => id == r.Id)!;

            return reportFile;
        }
    }
}
