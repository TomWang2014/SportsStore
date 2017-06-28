using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.Owin.Security;

namespace SportsStore.Infrastructure.Identity
{
    public class StoreAuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            StoreUserManager userManager = context.OwinContext.Get<StoreUserManager>("AspNet.Identity.Owin:" + typeof(StoreUserManager).AssemblyQualifiedName);
            StoreUser user = await userManager.FindAsync(context.UserName, context.Password);
            if (user == null)
            {
                context.SetError("invalid_grant", "the username or password is incorrect");
            }
            else
            {
                ClaimsIdentity ident = await userManager.CreateIdentityAsync(user, "Custom");
                AuthenticationTicket ticket = new AuthenticationTicket(ident, new AuthenticationProperties());
                context.Validated(ticket);
                context.Request.Context.Authentication.SignIn(ident);
            }
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return Task.FromResult<object>(null);
        }
    }
}