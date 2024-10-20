namespace Models
{
    public class InventoryReportWorldOffice
    {
        public String CodeProduct {  get; set; } = String.Empty;

        public String UnitOfMeasurement {  get; set; } = String.Empty;

        public Decimal Price { get; set; }

        public Decimal IvaPercentage { get; set; }

        public Int32 Stock {  get; set; }
    }
}
