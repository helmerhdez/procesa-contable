using Data;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers.Areas.Capture
{
    [ApiController]
    [Route("Report")]
    public class ReportController : Controller
    {
        private readonly DataReports dataReports;
        private readonly UserHelper userHelper;

        public ReportController(DataReports dataReports, UserHelper userHelper)
        {
            this.dataReports = dataReports;
            this.userHelper = userHelper;
        }

        [HttpGet]
        [Route("List")]
        public IActionResult GetList(Int32 pageNumber, Int32 pageSize)
        {
            String nit = userHelper.GetUser();
            List<Report> bills = dataReports.GetListByDocumentNumber(nit);
            Int32 count = bills.Count();

            List<Report> pageItems = bills.OrderBy(b => b.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new { pageItems, count });
        }
    }
}
