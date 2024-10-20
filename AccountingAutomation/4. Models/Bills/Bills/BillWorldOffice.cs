namespace Models
{
    public class BillWorldOffice
    {
        public String Name { get; set; } = String.Empty;

        public String DocumentType { get; set; } = String.Empty;

        public String Prefix {  get; set; } = String.Empty;

        public Int32 DocumentNumber { get; set; }

        public String Date { get; set; } = String.Empty;

        public Int32 InternalThird { get; set; }

        public Int32 ExternalThird { get; set; }

        public String Note { get; set; } = String.Empty;
    
        public String PaymentMethod { get; set; } = String.Empty;

        //Products detail
        public String ProductName { get; set; } = String.Empty;

        public String Store { get; set; } = String.Empty;

        public String UnitOfMeasurement { get; set; } = String.Empty;

        public Int32 Quantity { get; set; }

        public Decimal IvaPercentage { get; set; }

        public Decimal UnitAmount { get; set; }

        public Decimal Discount { get; set; }

        public String DateExpiration { get; set; } = String.Empty;

        //TODO: Agregar campos y dejar igual al xls de importación de World Office
    }
}
