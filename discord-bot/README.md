# Copper Bot

# Usage

Install dependencies:

```
$ npm i
```

You'll need to add a file named **.env** into the **discord-bot** directory. This file is automatically ignore by git and is safe for secrets.

There's an **example.env** to help you know what properties it will need.

*discord-bot\\.env*:
```
DISCORD_BOT_TOKEN=OTEyMDY5MDg0MzMyNTU2MzU5.YZqkhw.JS8HfKYY2-zXbYBtOQ5K2Otovn4
DATABASE_TYPE= // mongodb, cache, discord, 
SERVER_IP=
SERVER_WEBSOCKET_PORT=
```

Start the server with the following command:

```
$ npm run start
```

`npm run start` automatically builds the server from typescript to javascript, and runs the built javascript files.

To just build the scripts without running them:

```
$ npm run build
```

To delete an old build (**dist**):

```
$ npm run clean
```

Git will automatically ignore all minecraft server related files and the **dist** folder so feel free to test around and leave them locally for yourself.

The script will automatically reload when changes are made. This means if you make changes while the bot is running, you can run `npm run build` in a separate terminal and the running process will restart.

# Tasks

- [ ] Commands Structure
- [ ] Add Commands
  - [ ] `/register {username}`: *Records your minecraft username with your discord username, sends to minecraft to be added to whitelist.*
  - [ ] `/unregister {username}`: *Deletes record of minecraft username and bans them.*
  - [ ] `/sethome`: *Gets your location from the minecraft server, saves your location as your home.*
  - [ ] `/findhome {username}`: *Gives location of that person's home.*
  - [ ] `/createstore {storename}`: *?*
  - [ ] `/findstore {storename}`: *?*
  - [ ] `/whosselling {item}`: *Shows stores and prices*
  - [ ] `/stats {username or default to you}`: *shows you online time and graph of when you're online*.
