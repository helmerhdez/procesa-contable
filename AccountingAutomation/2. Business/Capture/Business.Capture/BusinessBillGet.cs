using System.Xml;
using System.Xml.Serialization;
using API.Business;
using API.Data.Data;
using API.Models.Deserialize;
using Data;
using Models;

namespace Business.Capture
{
    public class BusinessBillGet : BusinessBase
    {
        private readonly DataBills dataBills;
        private readonly DataBillGetXml dataBillGetXml;

        public BusinessBillGet(DataBills dataBills, DataBillGetXml dataBillGetXml)
        {
            this.dataBills = dataBills;
            this.dataBillGetXml = dataBillGetXml;
        }

        public BillDeserialize Get(Int32 billId)
        {
            BillDeserialize billDeserialize = new BillDeserialize();
            Bill bill = dataBills.Get(billId)!;

            XmlDocument xmlDoc = dataBillGetXml.Get(bill.FileName);
            XmlSerializer serializer = new XmlSerializer(typeof(BillDeserialize));

            XmlReader reader = new XmlNodeReader(xmlDoc);
            billDeserialize = (BillDeserialize?)serializer.Deserialize(reader)!;

            return billDeserialize;
        }

        public List<BillDeserialize> GetList(List<Int32> billIds)
        {
            List<BillDeserialize> billDeserializes = new List<BillDeserialize>();
            List<Bill> bills = dataBills.GetListById(billIds);

            foreach (Bill bill in bills)
            {
                XmlDocument xmlDoc = dataBillGetXml.Get(bill.FileName);
                XmlSerializer serializer = new XmlSerializer(typeof(BillDeserialize));

                XmlReader reader = new XmlNodeReader(xmlDoc);
                BillDeserialize? billDeserialize = (BillDeserialize?)serializer.Deserialize(reader);

                if (billDeserialize != null)
                {
                    billDeserializes.Add(billDeserialize);
                }
            }

            return billDeserializes;
        }
    }
}
