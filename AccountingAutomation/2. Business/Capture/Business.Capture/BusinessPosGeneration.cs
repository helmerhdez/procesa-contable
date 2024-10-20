using API.Business;
using Data;
using Models;
using OfficeOpenXml;
using System.ComponentModel;
using System.Data;
using System.Reflection;

namespace Business.Capture
{
    public class BusinessPosGeneration : BusinessBase
    {
        private String fileName;
        private Int32 lastDocumentNumber;
        DateTime DateStart;
        DateTime DateEnd;
        Int32 billQuantity;

        public BusinessPosGeneration(String fileName, Int32 lastDocumentNumber, DateTime dateStart, DateTime dateEnd, Int32 billQuantity)
        {
            this.fileName = fileName;
            this.lastDocumentNumber = lastDocumentNumber;
            this.DateStart = dateStart;
            this.DateEnd = dateEnd;
            this.billQuantity = billQuantity;
        }

        public override void Procces()
        {
            DataInventoryReportGetExcel dataInventoryReportGetExcel = new(fileName);

            if (dataInventoryReportGetExcel.Execute())
            {
                List<InventoryReportWorldOffice> inventoryReportWorldOffices = (List<InventoryReportWorldOffice>)dataInventoryReportGetExcel.Result;
                inventoryReportWorldOffices.OrderByDescending(i => i.Stock);
                inventoryReportWorldOffices = inventoryReportWorldOffices.Where(i => i.Stock > 0).ToList();

                List<BillWorldOffice> billWorldOffices = new List<BillWorldOffice>();

                Int32 billsxDay = DateEnd.Day - DateStart.Day / billQuantity;
                Int32 billsInCurrenDay = 0;
                Decimal billPrice = 0;
                DateTime dateCurrent = DateStart;
                Random random = new Random();

                while (billQuantity > 0)
                {
                    if (billsxDay == billsInCurrenDay)
                    {
                        dateCurrent.AddDays(1);
                        billsInCurrenDay = 0;
                    }

                    if (billPrice > 200000)
                    {
                        lastDocumentNumber++;
                        billQuantity--;
                        billPrice = 0;
                        billsInCurrenDay++;
                    }

                    InventoryReportWorldOffice item = inventoryReportWorldOffices[random.Next(inventoryReportWorldOffices.Count())];
                    Int32 quantityProduct = 
                        item.Price < 20000 ? 5 :
                        item.Price < 50000 ? 2 :
                        item.Price < 100000 ? 1 :
                        item.Price < 200000 ? 1 : 0;

                    if (quantityProduct > 0)
                    {
                        BillWorldOffice billWorldOffice = new BillWorldOffice
                        {
                            Name = String.Empty,
                            DocumentType = "FV",
                            Prefix = "POS",
                            DocumentNumber = lastDocumentNumber,
                            Date = dateCurrent.ToString("d/MM/yyyy"),
                            ExternalThird = 222222222,
                            Note = "Factura de Venta",
                            PaymentMethod = "Contado",

                            ProductName = item.CodeProduct,
                            Store = "Principal",
                            UnitOfMeasurement = item.UnitOfMeasurement,
                            Quantity = quantityProduct,
                            UnitAmount = item.Price,
                            DateExpiration = dateCurrent.ToString("d/MM/yyyy")
                        };

                        billWorldOffices.Add(billWorldOffice);
                        billPrice += item.Price;
                    }
                }

                DataTable dataTable = GetDataTableFromObject(typeof(BillWorldOffice));

                foreach (BillWorldOffice billWorldOffice in billWorldOffices)
                {
                    dataTable.Rows.Add(ToDataRow(billWorldOffice, dataTable));
                }

                ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;
                ExcelPackage excelPackage = new ExcelPackage();
                ExcelWorksheet excelWorksheet = excelPackage.Workbook.Worksheets.Add("Hoja1");
                excelWorksheet.Cells["A1"].LoadFromDataTable(dataTable, true);

                MemoryStream memoryStream = new MemoryStream();
                excelPackage.SaveAs(memoryStream);

                Byte[] bytes = memoryStream.ToArray();
                SetResult(Convert.ToBase64String(bytes));
            }
            else
            {
                SetValidation(dataInventoryReportGetExcel.Exception);
            }
        }

        private DataTable GetDataTableFromObject(Type type)
        {
            DataTable dataTable = new DataTable();
            PropertyDescriptorCollection propertyDescriptorCollections = TypeDescriptor.GetProperties(type);

            foreach (PropertyDescriptor propertyDescriptor in propertyDescriptorCollections)
            {
                dataTable.Columns.Add(propertyDescriptor.Name, propertyDescriptor.PropertyType);
            }

            return dataTable;
        }

        private DataRow ToDataRow(Object from, DataTable dataTable)
        {
            DataRow dataRow = dataTable.NewRow();

            foreach (PropertyInfo propertyInfo in from.GetType().GetProperties())
            {
                dataRow[propertyInfo.Name] = propertyInfo.GetValue(from);
            }

            return dataRow;
        }
    }
}
