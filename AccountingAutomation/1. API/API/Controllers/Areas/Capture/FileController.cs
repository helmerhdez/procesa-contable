using API.Models.Consts;
using Business.Capture;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Areas.Capture
{
    [ApiController]
    [Route("File")]
    public class FileController : Controller
    {
        private readonly BusinessBillCreate businessBillCreate;

        public FileController(BusinessBillCreate businessBillCreate)
        {
            this.businessBillCreate = businessBillCreate;
        }

        [HttpPost]
        [Route("Bill")]
        public IActionResult UploadBillFile(IFormFile[] files)
        {
            List<Int32> fileIds = new List<Int32>();
            try
            {
                foreach (var file in files)
                {
                    if (file == null || file.Length == 0 || Path.GetExtension(file.FileName) != ".xml")
                    {
                        return BadRequest("No se ha proporcionado ningún archivo, el archivo está vacío o no es un XML.");
                    }
                    else
                    {
                        String fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                        String filePath = Path.Combine(ConstantParameters.RootPath, fileName);

                        using (FileStream stream = new FileStream(filePath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                        fileIds.Add(businessBillCreate.Create(fileName));
                    }
                }
                return Ok(fileIds);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Ocurrió un error al subir el archivo: {ex.Message}");
            }
        }

        //[HttpPost]
        //[Route("InventoryReport")]
        //public IActionResult UploadInventoryReportFile(IFormFile file)
        //{
        //    try
        //    {
        //        if (file == null || file.Length == 0 || Path.GetExtension(file.FileName) != ".xlsx")
        //        {
        //            return BadRequest("No se ha proporcionado ningún archivo, el archivo está vacío o no es un XLSX.");
        //        }
        //        else
        //        {
        //            String fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        //            String filePath = Path.Combine(ConstantParameters.InventoryReportPath, fileName);

        //            using (FileStream stream = new FileStream(filePath, FileMode.Create))
        //            {
        //                file.CopyTo(stream);
        //            }

        //            return Ok(fileName);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, $"Ocurrió un error al subir el archivo: {ex.Message}");
        //    }
        //}

        [HttpGet]
        [Route("Download")]
        public IActionResult DownloadFile(String fileName)
        {
            try
            {
                Byte[] fileBytes;
                using (FileStream stream = new FileStream(Path.Combine(ConstantParameters.RootPath, fileName), FileMode.Open, FileAccess.Read))
                {
                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        stream.CopyTo(memoryStream);
                        fileBytes = memoryStream.ToArray();
                    }
                }

                return Ok(Convert.ToBase64String(fileBytes));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Ocurrió un error al leer el archivo: {ex.Message}");
            }
        }
    }
}
