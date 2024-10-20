using API.Data.Data;
using API.Models.Deserialize;
using Data;
using Models;
using System.Xml.Serialization;
using System.Xml;
using System.Text.RegularExpressions;
using Business.Parametrization;

namespace Business.Capture
{
    public class BusinessBillCreate
    {
        private readonly DataBills dataBills;
        private readonly DataBillGetXml dataBillGetXml;
        private readonly BusinessProductHomologationCreate businessProductHomologationCreate;

        public BusinessBillCreate(DataBills dataBills, DataBillGetXml dataBillGetXml, BusinessProductHomologationCreate businessProductHomologationCreate)
        {
            this.dataBills = dataBills;
            this.dataBillGetXml = dataBillGetXml;
            this.businessProductHomologationCreate = businessProductHomologationCreate;
        }

        public Int32 Create(String fileName)
        {
            Int32 result = 0;
            XmlDocument xmlDoc = dataBillGetXml.Get(fileName);
            XmlSerializer serializer = new XmlSerializer(typeof(BillDeserialize));

            XmlReader reader = new XmlNodeReader(xmlDoc);
            BillDeserialize? billDeserialize = (BillDeserialize?)serializer.Deserialize(reader);

            if (billDeserialize != null)
            {
                Bill bill = new Bill
                {
                    FileName = fileName,
                    Nit = billDeserialize.AccountingCustomerParty!.Party!.PartyLegalEntity!.CompanyID!.Value!,
                    DocumentNumber = (Regex.Match(billDeserialize!.Id!, @"\d+$").Value),
                    DateCreation = DateTime.Now
                };

                dataBills.Create(bill);
                result = bill.Id;

                businessProductHomologationCreate.ProductHomologationCreate(billDeserialize, bill.Id);
            }

            return result;
        }
    }

}
