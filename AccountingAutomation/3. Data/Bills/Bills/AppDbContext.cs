using Microsoft.EntityFrameworkCore;
using Models;

namespace Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Bill> BILLS { get; set; }

        public DbSet<Report> REPORTS { get; set; }

        public DbSet<ProductHomologation> PRODUCT_HOMOLOGATIONS { get; set; }

        public DbSet<ReportFile> REPORT_FILES { get; set; }
    }
}
