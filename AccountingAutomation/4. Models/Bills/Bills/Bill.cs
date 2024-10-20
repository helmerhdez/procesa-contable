using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Bill
    {
        [Key]
        public Int32 Id { get; set; }

        [Required]
        [StringLength(50)]
        public String Nit { get; set; } = String.Empty;

        [Required]
        [StringLength(50)]
        public String DocumentNumber { get; set; } = String.Empty;

        [Required]
        [StringLength(50)]
        public String FileName { get; set; } = String.Empty;

        [Required]
        public DateTime DateCreation { get; set; } = DateTime.MinValue;
    }
}
