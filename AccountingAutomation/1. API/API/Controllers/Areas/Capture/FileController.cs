using Business.Capture;
using Data;
using Microsoft.AspNetCore.Mvc;
using Models;
using Newtonsoft.Json;
using OfficeOpenXml;

namespace API.Controllers.Areas.Capture
{
    [ApiController]
    [Route("File")]
    public class FileController : Controller
    {
        private readonly BusinessBillCreate businessBillCreate;
        private readonly DataReportFile dataReportFile;

        public FileController(BusinessBillCreate businessBillCreate,
            DataReportFile dataReportFile)
        {
            this.businessBillCreate = businessBillCreate;
            this.dataReportFile = dataReportFile;
        }

        [HttpPost]
        [Route("Bill")]
        public IActionResult UploadBillFile(IFormFile[] files)
        {
            List<Int32> fileIds = new List<Int32>();

            try
            {
                foreach (IFormFile file in files)
                {
                    if (file == null || file.Length == 0 || Path.GetExtension(file.FileName) != ".xml")
                    {
                        return BadRequest("No se ha proporcionado ningún archivo, el archivo está vacío o no es un XML.");
                    }
                    else
                    {
                        using (Stream stream = file.OpenReadStream())
                        {
                            fileIds.Add(businessBillCreate.Create(stream));
                        }
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
                ReportFile reportFile = dataReportFile.Get(fileName);

                String base64 = String.Empty;

                switch (reportFile.TypeId)
                {
                    case (Int32)ReportTypeEnum.WorldOfficeBill:
                        base64 = createFile(JsonConvert.DeserializeObject<List<BillWorldOffice>>(reportFile.Json)!);
                        break;
                    case (Int32)ReportTypeEnum.WorldOfficeProducts:
                        base64 = createFile(JsonConvert.DeserializeObject<List<ProductWOGenerate>>(reportFile.Json)!);
                        break;
                }

                if (!String.IsNullOrEmpty(base64))
                {
                    return Ok(base64);
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, $"Ocurrió un error al leer el archivo");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Ocurrió un error al leer el archivo: {ex.Message}");
            }
        }

        private String createFile<T>(List<T> list)
        {
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            ExcelPackage excelPackage = new ExcelPackage();
            ExcelWorksheet excelWorksheet = excelPackage.Workbook.Worksheets.Add("Hoja1");
            excelWorksheet.Cells["A1"].LoadFromCollection(list, true);

            using (MemoryStream stream = new MemoryStream())
            {
                excelPackage.SaveAs(stream);

                return Convert.ToBase64String(stream.ToArray());
            }
        }
    }
}
