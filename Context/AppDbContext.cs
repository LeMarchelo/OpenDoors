using Microsoft.EntityFrameworkCore;
using backOpenDoors.Models;

namespace backOpenDoors.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {            
        }
        public DbSet<Door> Doors { get; set; }
        public DbSet<User> Users { get; set; }
    }
}