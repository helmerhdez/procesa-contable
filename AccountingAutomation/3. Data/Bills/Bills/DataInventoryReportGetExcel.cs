using API.Models.Consts;
using Models;
using OfficeOpenXml;
using System.Xml;

namespace Data
{
    public class DataInventoryReportGetExcel : DataBase
    {
        private String fileName;

        public DataInventoryReportGetExcel(String fileName)
        {
            this.fileName = fileName;
        }

        public override void Procces()
        {
            String filePath = String.Concat(ConstantParameters.InventoryReportPath, fileName);

            ExcelPackage package = new ExcelPackage(new FileInfo(filePath));
            ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
            worksheet.DeleteRow(0);
            worksheet.DeleteRow(0);

            List<InventoryReportWorldOffice> inventoryReportWorldOffice = new List<InventoryReportWorldOffice>();

            for (Int32 row = 1; row <= worksheet.Dimension.Rows; row++)
            {
                inventoryReportWorldOffice.Add(new InventoryReportWorldOffice
                {
                    CodeProduct = worksheet.Cells[row, 5].ToString(),
                    UnitOfMeasurement = worksheet.Cells[row, 10].ToString(),
                    Price = Decimal.Parse(worksheet.Cells[row, 11].ToString()),
                    IvaPercentage = Decimal.Parse(worksheet.Cells[row, 15].ToString()),
                    Stock = Int32.Parse(worksheet.Cells[row, 16].ToString()),
                });
            }

            SetResult(inventoryReportWorldOffice);
        }

    }
}