using API.Models.Consts;
using Data;
using System.Xml;

namespace API.Data.Data
{
    public class DataBillGetXml
    {
        public DataBillGetXml() { }

        public XmlDocument Get(String fileName)
        {
            String filePath = String.Concat(ConstantParameters.RootPath, fileName);

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.Load(filePath);
            XmlNode? xmlNode = xmlDoc.ChildNodes[1]?.ChildNodes[12]?.ChildNodes[0]?.ChildNodes[2] ?? null;

            if (xmlNode != null)
            {
                String xmlNodeInnerText = xmlNode.InnerText;
                xmlDoc.LoadXml(xmlNodeInnerText);
            }

            return xmlDoc;
        }
    }
}
