using API.Business;
using API.Models.Consts;
using API.Models.Deserialize;
using Data;
using Models;
using Newtonsoft.Json;
using OfficeOpenXml;

namespace Business.Capture
{
    public class BusinessBillWorldOfficeProcess : BusinessBase
    {
        private readonly BusinessBillWorldOfficeGenerate businessBillWorldOfficeGenerate;
        private readonly BusinessProductWOParametricGenerate businessProductWOParametricGenerate;
        private readonly DataReportFile dataReportFile;

        public BusinessBillWorldOfficeProcess(BusinessBillWorldOfficeGenerate businessBillWorldOfficeGenerate, 
            BusinessProductWOParametricGenerate businessProductWOParametricGenerate,
            DataReportFile dataReportFile)
        {
            this.businessBillWorldOfficeGenerate = businessBillWorldOfficeGenerate;
            this.businessProductWOParametricGenerate = businessProductWOParametricGenerate;
            this.dataReportFile = dataReportFile;
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

            ReportFile reportFile = new ReportFile
            {
                Id = $"{Guid.NewGuid().ToString()}.xlsx",
                Json = JsonConvert.SerializeObject(billsWorldOffice),
                TypeId = (Int32)ReportTypeEnum.WorldOfficeBill,
                DateCreation = DateTime.Now
            };

            dataReportFile.Create(reportFile);
            fileNames.Add(reportFile.Id);

            reportFile = new ReportFile
            {
                Id = $"{Guid.NewGuid().ToString()}.xlsx",
                Json = JsonConvert.SerializeObject(productsWOGenerate),
                TypeId = (Int32)ReportTypeEnum.WorldOfficeProducts,
                DateCreation = DateTime.Now
            };

            dataReportFile.Create(reportFile);
            fileNames.Add(reportFile.Id);

            return fileNames;
        }
    }
}
