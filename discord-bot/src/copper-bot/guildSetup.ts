import { Role } from "discord.js";

export function guildSetup(guild: any) {

    
    const unregisteredUsersRole = initializeRoles(guild.roles);
    assignRoles(guild, unregisteredUsersRole);
    setWelcome(guild)

}

function setWelcome(guild: any) {

}


function initializeRoles(roles: any){
    let unregisteredUsersRole;
    roles.create({
        name: 'Unregistered Users',
        color: '#FF0000',
        reason: 'Role for users that have not registered their minecraft username'
      }).then((role: { id: any; }) => unregisteredUsersRole = role);
  
      roles.create({
        name: 'Registered Users',
        color: 'GREEN',
        reason: 'Role for users that have registered their MC username'
      })

      return unregisteredUsersRole;
}

function assignRoles(guild: any, unregisteredUsersRole: Role) {
   
    guild.members.fetch().then((members: any[]) =>
    {
          
        members.forEach((member: any) =>
        {
          console.log(member.nick);
          member.roles.add(unreg_role);
        });
    });
    console.log("this ran");
}

