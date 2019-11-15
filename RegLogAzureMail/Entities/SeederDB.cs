using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RegLogAzureMail.Entities
{
    public class SeederDB
    {
        public static void SeedData(IServiceProvider services, IHostingEnvironment env,
            IConfiguration config)
        {

            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var managerUser = scope.ServiceProvider.GetRequiredService<UserManager<DbUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<DbRole>>();

                SeedUsers(managerUser, managerRole);
            }
        }
        public static void SeedUsers(UserManager<DbUser> userManager,RoleManager<DbRole> roleManager)
        {
            string roleName = "Admin";
            var role = roleManager.FindByNameAsync(roleName).Result;
            if (role == null)
            {
                role = new DbRole
                {
                    Name = roleName
                };
                var addRoleResult = roleManager.CreateAsync(role).Result;
            }
            roleName = "Employee";
            role = roleManager.FindByNameAsync(roleName).Result;
            if (role == null)
            {
                role = new DbRole
                {
                    Name = roleName
                };
                var addRoleResult = roleManager.CreateAsync(role).Result;
            }
            var userEmail = "admin@gmail.com";
            var user = userManager.FindByEmailAsync(userEmail).Result;
            if (user == null)
            {
                user = new DbUser
                {
                    Email = userEmail,
                    UserName = "Yura"
                };
                var result = userManager.CreateAsync(user, "Qwerty1-").Result;
                if (result.Succeeded)
                {
                    result = userManager.AddToRoleAsync(user, roleName).Result;
                }
            }
            userEmail = "maks123@gmail.com";
            user = userManager.FindByEmailAsync(userEmail).Result;
            if (user == null)
            {
                user = new DbUser
                {
                    Email = userEmail,
                    UserName = "Maksim"
                };
                var result = userManager.CreateAsync(user, "max12478-Q").Result;
                if (result.Succeeded)
                {
                    result = userManager.AddToRoleAsync(user, roleName).Result;
                }
            }
            userEmail = "zaharjoker@gmail.com";
            user = userManager.FindByEmailAsync(userEmail).Result;
            if (user == null)
            {
                user = new DbUser
                {
                    Email = userEmail,
                    UserName = "Zahar"
                };
                var result = userManager.CreateAsync(user, "zahardeadinside!39-R").Result;
                if (result.Succeeded)
                {
                    result = userManager.AddToRoleAsync(user, roleName).Result;
                }
            }
            userEmail = "invoker@ukr.net";
            user = userManager.FindByEmailAsync(userEmail).Result;
            if (user == null)
            {
                user = new DbUser
                {
                    Email = userEmail,
                    UserName = "Carl"
                };
                var result = userManager.CreateAsync(user, "quaswexQ-11").Result;
                if (result.Succeeded)
                {
                    result = userManager.AddToRoleAsync(user, roleName).Result;
                }
            }
        }
    }
}