using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class ReportFile
    {
        [Key]
        public required String Id { get; set; }

        [Required]
        public String Json { get; set; } = String.Empty;

        [Required]
        public Int32 TypeId { get; set; }

        [Required]
        public DateTime DateCreation { get; set; }
    }
}
