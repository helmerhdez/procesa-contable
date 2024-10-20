namespace Models
{
    public class ProductWOGenerate
    {
        public String Code { get; set; } = String.Empty;

        public String Description { get; set; } = String.Empty;

        public Int32 Active { get; set; }

        public Int32 MaxQuantity { get; set; }

        public Int32 MinQuantity { get; set; }

        public Int32 ReorderQuantity { get; set; }
    
        public String UnitOfMeasurement { get; set; } = String.Empty;

        public Decimal Price {  get; set; }

        public String GroupOne { get; set; } = String.Empty;

        public Decimal Iva { get; set; }

        public String TypeIva { get; set; } = String.Empty;

        public String Clasification { get; set; } = String.Empty;

        public String ClasificationNiif { get; set; } = String.Empty;

        public Int32 Product {  get; set; }

        public Int32 BillOutOfStock { get; set; }
    }
}
