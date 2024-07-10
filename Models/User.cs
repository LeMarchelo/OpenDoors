using System.ComponentModel.DataAnnotations;

namespace backOpenDoors.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public bool Active { get; set; }
        public required string Type { get; set; }
        public bool PwReset { get; set; }
        public bool Loged { get; set; }
    }
}