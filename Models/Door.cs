using System.ComponentModel.DataAnnotations;

namespace backOpenDoors.Models
{
    public class Door
    {
        [Key]
        public int Id { get; set; }
        public required string DoorName { get; set; }
        public bool Active { get; set; }
        public bool ActivationStatus { get; set; }

        public DateTime LastActivation { get; set; }

        public required string Number { get; set; }
        public required string Street { get; set; }
        public required string District { get; set; }
        public required string City { get; set; }
        public required string Country { get; set; }
        public required string PostalCode { get; set; }
    }
}