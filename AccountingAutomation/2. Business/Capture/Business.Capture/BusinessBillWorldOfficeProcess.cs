using API.Business;
using API.Models.Consts;
using API.Models.Deserialize;
using Models;
using OfficeOpenXml;

namespace Business.Capture
{
    public class BusinessBillWorldOfficeProcess : BusinessBase
    {
        private readonly BusinessBillWorldOfficeGenerate businessBillWorldOfficeGenerate;
        private readonly BusinessProductWOParametricGenerate businessProductWOParametricGenerate;

        public BusinessBillWorldOfficeProcess(BusinessBillWorldOfficeGenerate businessBillWorldOfficeGenerate, BusinessProductWOParametricGenerate businessProductWOParametricGenerate)
        {
            this.businessBillWorldOfficeGenerate = businessBillWorldOfficeGenerate;
            this.businessProductWOParametricGenerate = businessProductWOParametricGenerate;
        }

        public List<String> Procces(List<BillDeserialize> billDeserializes, String documentNumber)
        {
            List<String> fileNames = new List<String>();
            List<BillWorldOffice> billsWorldOffice = new List<BillWorldOffice>();
            List<ProductWOGenerate> productsWOGenerate = new List<ProductWOGenerate>();

            foreach (BillDeserialize billDeserialize in billDeserializes)
            {
                billsWorldOffice.AddRange(businessBillWorldOfficeGenerate.Procces(billDeserialize, documentNumber));
                productsWOGenerate.AddRange(businessProductWOParametricGenerate.Procces(billDeserialize.InvoiceLines!, documentNumber));
            }

            fileNames.Add(saveFile(billsWorldOffice));
            fileNames.Add(saveFile(productsWOGenerate));

            return fileNames;
        }

        private String saveFile<T>(List<T> list)
        {
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
            ExcelPackage excelPackage = new ExcelPackage();
            ExcelWorksheet excelWorksheet = excelPackage.Workbook.Worksheets.Add("Hoja1");
            excelWorksheet.Cells["A1"].LoadFromCollection(list, true);
            excelPackage.Save();

            String fileName = String.Concat(Guid.NewGuid().ToString(), ".xlsx");
            String filePath = String.Concat(ConstantParameters.RootPath, fileName);

            using (FileStream fileStream = new FileStream(filePath, FileMode.Create))
            {
                excelPackage.SaveAs(fileStream);
            }

            return fileName;
        }
    }
}
