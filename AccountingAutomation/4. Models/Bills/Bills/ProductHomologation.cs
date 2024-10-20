using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class ProductHomologation
    {
        [Key]
        public Int32 Id { get; set; }

        [Required]
        public String DocumentNumber { get; set; } = String.Empty;

        [Required]
        public String ProviderDocumentNumber { get; set; } = String.Empty;

        [Required]
        public String ProductBillName { get; set; } = String.Empty;

        [Required]
        public String ProductUserName { get; set; } = String.Empty;

        [Required]
        public String ProductUserDescription { get; set; } = String.Empty;

        [Required]
        public Int32 BillId { get; set; }

        [Required]
        public Int32 Bill { get; set; }
    }
}
