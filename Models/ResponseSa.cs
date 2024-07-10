
namespace backOpenDoors.Models
{
    public class ResponseSa
    {
        public string? Title { get; set; }
        public string? Text { get; set; }
        public string? Icon { get; set; }

        public ResponseSa(string titulo, string text, string Icon)
        {
            this.Title = titulo;
            this.Text = text;
            this.Icon = Icon;
        }
    }
}