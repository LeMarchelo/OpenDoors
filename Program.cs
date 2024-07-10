using Microsoft.EntityFrameworkCore;
using backOpenDoors.Context;

var builder = WebApplication.CreateBuilder(args);
string _MyCors = "MyCors";

// Add CORS
builder.Services.AddCors(options =>
            {
    options.AddPolicy(name: _MyCors,
    policy =>
    {
        //policy.AllowAnyOrigin()
        policy.WithOrigins("http://192.168.0.115:5173")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

//Add Controlers
builder.Services.AddControllers();            
//Add DB connection
var connectionString = builder.Configuration.GetConnectionString("Connection");
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddEndpointsApiExplorer();
//Add API Swagger to test and create documentation for the API
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(_MyCors);
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();   

app.Run();