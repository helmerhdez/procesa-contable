using Microsoft.AspNetCore.Mvc.Filters;
using System.IdentityModel.Tokens.Jwt;

namespace API
{
    public class Authorization : ActionFilterAttribute
    {
        private readonly RequestDelegate _next;

        public Authorization(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            Boolean productionEnvironment = false;
            var token = context.Request.Cookies["access_token"];

            if (token != null)
            {
                // Realizar validaciones personalizadas del JWT
                if (!ValidateJwtToken(token))
                {
                    // Si el token no es válido, devolver una respuesta de error
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Token no válido.");
                    return;
                }
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Token no proporcionado.");
                return;
            }

            if (productionEnvironment)
            {
                // Obtener el token JWT de los headers de la solicitud
                
            }

            // Llamar al siguiente middleware en la cadena
            await _next(context);
        }

        private bool ValidateJwtToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();

                if (!tokenHandler.CanReadToken(token))
                {
                    return false;
                }

                var jwtToken = tokenHandler.ReadJwtToken(token);

                // Aquí puedes agregar tus validaciones personalizadas de los claims
                var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "user_id");
                if (userIdClaim == null || string.IsNullOrEmpty(userIdClaim.Value))
                {
                    return false;
                }

                // Agrega otras validaciones según sea necesario
                // Por ejemplo: verificar la expiración del token, la audiencia, etc.

                return true; // Si todas las validaciones son correctas
            }
            catch
            {
                return false;
            }
        }
    }
}
