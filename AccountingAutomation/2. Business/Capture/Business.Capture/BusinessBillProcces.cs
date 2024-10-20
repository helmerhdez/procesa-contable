using API.Business;
using API.Models.Deserialize;
using Data;
using Models;
using System.Text.RegularExpressions;

namespace Business.Capture
{
    public class BusinessBillProcces : BusinessBase
    {
        private readonly BusinessBillGet businessBillGet;
        private readonly BusinessBillWorldOfficeProcess businessBillWorldOfficeProcess;
        private readonly DataReports dataReports;

        public BusinessBillProcces(BusinessBillGet businessBillGet, BusinessBillWorldOfficeProcess businessBillWorldOfficeProcess, DataReports dataReports)
        {
            this.businessBillGet = businessBillGet;
            this.businessBillWorldOfficeProcess = businessBillWorldOfficeProcess;
            this.dataReports = dataReports;
        }

        public Report? Procces(List<Int32> billIds, String documentNumber)
        {
            List<String> fileNames = new List<String>();
            List<BillDeserialize> billDeserializes = businessBillGet.GetList(billIds);

            if (billDeserializes.Count > 0)
            {
                fileNames.AddRange(businessBillWorldOfficeProcess.Procces(billDeserializes, documentNumber));

                Report report = new Report
                {
                    DateCreation = DateTime.Now,
                    DocumentNumber = documentNumber,
                    FileNames = fileNames
                };

                foreach (BillDeserialize billDeserialize in billDeserializes)
                {
                    String pattern = @"\d+$";
                    Match match = Regex.Match(billDeserialize!.Id!, pattern);
                    report.Bills.Add(Convert.ToString(match.Value));
                }

                report = dataReports.Create(report);

                return report;
            }

            return null;
        }
    }
}
