using API.Data.Data;
using Business.Capture;
using Business.Parametrization;
using Data;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            string? host = builder.Configuration["DB_HOST"] ?? builder.Configuration.GetConnectionString("DB_HOST");
            string? dbName = builder.Configuration["DB_NAME"] ?? builder.Configuration.GetConnectionString("DB_NAME");
            string? dbPort = builder.Configuration["DB_PORT"] ?? builder.Configuration.GetConnectionString("DB_PORT");
            string? dbUser = builder.Configuration["MYSQL_ROOT_PASSWORD"] ?? builder.Configuration.GetConnectionString("MYSQL_ROOT_PASSWORD");
            string? dbPass = builder.Configuration["MYSQL_ROOT_PASSWORD"] ?? builder.Configuration.GetConnectionString("MYSQL_PASSWORD");
            String connectionString = $"Server={host}; Port={dbPort}; Database={dbName}; Uid={dbUser}; Pwd={dbPass};";
            Console.WriteLine("Connection String: " + connectionString);

            builder.Services.AddDbContext<AppDbContext>(options => options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

            builder.Services.AddTransient<BusinessBillCreate>();
            builder.Services.AddTransient<BusinessBillProcces>();
            builder.Services.AddTransient<BusinessBillWorldOfficeGenerate>();
            builder.Services.AddTransient<BusinessBillWorldOfficeProcess>();
            builder.Services.AddTransient<BusinessProductWOParametricGenerate>();

            builder.Services.AddTransient<BusinessProductHomologationCreate>();

            builder.Services.AddTransient<DataBillGetXml>();
            builder.Services.AddTransient<DataBills>();
            builder.Services.AddTransient<DataReports>();
            builder.Services.AddTransient<DataProductHomologation>();
            builder.Services.AddTransient<DataReportFile>();

            builder.Services.AddTransient<UserHelper>();

            // Add services to the container.

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("http://localhost:3000").AllowCredentials().AllowAnyMethod().AllowAnyHeader();
                });
            });

            builder.Services.AddControllers();

            //builder.Services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //})
            //.AddJwtBearer(options =>
            //{
            //    options.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuer = false,
            //        ValidateAudience = false,
            //        ValidateLifetime = true,
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("a950857d1d0fdad7c36530095af222585d990de583a5d2471d6df9bc43bde20f"))
            //    };
            //});

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddHttpContextAccessor();

            var app = builder.Build();

            app.UseCors();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthentication();

            app.UseMiddleware<Authorization>();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
