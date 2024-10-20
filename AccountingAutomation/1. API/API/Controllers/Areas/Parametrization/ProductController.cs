using Data;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace API.Controllers.Areas.Parametrization
{
    [ApiController]
    [Route("Product")]
    public class ProductController : Controller
    {
        private readonly DataProductHomologation dataProductHomologation;

        public ProductController(DataProductHomologation dataProductHomologation)
        {
            this.dataProductHomologation = dataProductHomologation;
        }

        [HttpGet]
        [Route("GetListByBill")]
        public IActionResult GetListByBill(int billId)
        {
            List<ProductHomologation> productHomologations = dataProductHomologation.GetListByBillId(billId);

            return Ok(productHomologations);
        }

        [HttpPost]
        [Route("")]
        public IActionResult Update(List<ProductHomologation> productHomologations)
        {
            dataProductHomologation.Update(productHomologations);

            return Ok(true);
        }
    }
}
