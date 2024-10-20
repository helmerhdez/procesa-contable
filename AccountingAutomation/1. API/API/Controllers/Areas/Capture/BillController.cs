using Business.Capture;
using Data;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers.Areas.Capture
{
    [ApiController]
    [Route("Bill")]
    public class BillController : Controller
    {
        private readonly DataBills dataBills;
        private readonly BusinessBillProcces businessBillProcces;
        private readonly UserHelper userHelper;

        public BillController(DataBills dataBills, BusinessBillProcces businessBillProcces, UserHelper userHelper)
        {
            this.dataBills = dataBills;
            this.businessBillProcces = businessBillProcces;
            this.userHelper = userHelper;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Get(Int32 id)
        {
            Bill? bill = dataBills.Get(id);

            if (bill == null)
            {
                return NotFound();
            }

            return Ok(bill);
        }

        [HttpGet]
        [Route("List")]
        public IActionResult GetList(Int32 pageNumber, Int32 pageSize)
        {
            String nit = userHelper.GetUser();
            List<Bill> bills = dataBills.GetListByNit(nit);
            Int32 count = bills.Count();

            List<Bill> pageItems = bills.OrderBy(b => b.Id)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new { pageItems, count });
        }

        [HttpPost]
        [Route("Proccess")]
        public IActionResult Proccess(List<Int32> billIds)
        {
            String documentNumber = userHelper.GetUser();

            return Ok(businessBillProcces.Procces(billIds, documentNumber));
        }
    }
}
