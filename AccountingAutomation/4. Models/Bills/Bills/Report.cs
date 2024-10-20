using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Report
    {
        [Key]
        public Int32 Id { get; set; }

        [Required]
        [StringLength(50)]
        public String DocumentNumber { get; set; } = String.Empty;

        [Required]
        public DateTime DateCreation { get; set; }

        [Required]
        public List<String> FileNames { get; set; } = new List<String>();

        [Required]
        public List<String> Bills { get; set; } = new List<String>();
    }
}
