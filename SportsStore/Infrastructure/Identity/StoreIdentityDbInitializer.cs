using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SportsStore.Infrastructure.Identity
{
    public class StoreIdentityDbInitializer : CreateDatabaseIfNotExists<StoreIdentityDbContext>
    {
        protected override void Seed(StoreIdentityDbContext context)
        {
            StoreUserManager userManager = new StoreUserManager(new UserStore<StoreUser>(context));
            StoreRoleManager roleManager = new StoreRoleManager(new RoleStore<StoreRole>(context));
            string roleName = "Administrators";
            string userName = "Admin";
            string password = "secret";
            string email = "admin@example.com";
            if (!roleManager.RoleExists(roleName))
            {
                roleManager.Create(new StoreRole(roleName));
            }
            StoreUser user = userManager.FindByName(userName);
            if (user == null)
            {
                userManager.Create(new StoreUser { UserName = userName, Email = email }, password);
                user = userManager.FindByName(userName);
            }
            if (!userManager.IsInRole(user.Id, roleName))
            {
                userManager.AddToRole(user.Id, roleName);
            }
            base.Seed(context);
        }
    }
}