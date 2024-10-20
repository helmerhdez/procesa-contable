using System.IdentityModel.Tokens.Jwt;

namespace API
{
    public class UserHelper
    {
        private static IHttpContextAccessor? httpContextAccessor;

        public UserHelper(IHttpContextAccessor _httpContextAccessor)
        {
            httpContextAccessor = _httpContextAccessor;
        }

        public string GetUser()
        {
            string user = string.Empty;
            var context = httpContextAccessor!.HttpContext;
            if (context != null)
            {
                var token = context.Request.Cookies["access_token"];

                if (token != null)
                {
                    var tokenHandler = new JwtSecurityTokenHandler();

                    if (tokenHandler.CanReadToken(token))
                    {
                        var jwtToken = tokenHandler.ReadJwtToken(token);
                        var userIdClaim = jwtToken.Claims.FirstOrDefault(c => c.Type == "company_nit");

                        if (userIdClaim != null)
                        {
                            user = userIdClaim.Value;
                        }
                    }
                }
            }

            return user;
        }
    }
}
