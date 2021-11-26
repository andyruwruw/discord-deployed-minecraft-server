# Server Wrapper

The server wrapper is a javascript wrapper around the Minecraft Server, adding an API for us to interact with the Minecraft Server through websocket requests.

The ability to run a Minecraft Java Server with Javascript is thanks to [garrettjoecox/scriptserver](https://github.com/garrettjoecox/scriptserver), and should work for whatever Minecraft [server.jar](https://github.com/andyruwruw/discord-managed-minecraft-server/blob/main/server/server.jar) we choose, regardless of version.

The [websocket server](https://www.npmjs.com/package/websocket) will be connected to our discord bot. If you're not familiar with websockets, it allows the discord bot to send our server requests, and the server to send requests to the discord bot.

This allows the minecraft server to send events back to discord, such as server logs which we can display in a channel.

# Table of Contents

- [Usage](#usage)
- [File Structure](#file-structure)
- [Tasks](#tasks)

# Usage

Install dependencies:

```
$ npm i
```

You'll need to add a file named **.env** into the [server directory](https://github.com/andyruwruw/discord-managed-minecraft-server/tree/main/server). This file is automatically ignored by git.

There's an [example.env](https://github.com/andyruwruw/discord-managed-minecraft-server/blob/main/server/example.env) to help you know what properties it will need.

*ec2-config\server-wrapper\\.env*:
```
RCON_PASSWORD=somerandomstring
RCON_PORT=25575
SERVER_JAR_DIR=.
SERVER_JAR_NAME=server.jar
```

Start the server with the following command:

```
$ npm run start
```

Keep in mind that the first time running the server will create a **eula.txt** that you'll need to edit before Minecraft will allow the server to run.

So once the **eula.txt** appears, use **ctr-c** to close the script.

First edit the **eula.txt**:

```
eula=TRUE
```

Next you need to change some settings in **server.properties**, which will appear after running the script once.

Change the following properties in **server.properties**:

```
enable-rcon=true
rcon.port=25575
rcon.password=somerandomstring
broadcast-rcon-to-ops=false
```

Keep in mind the **rcon.port** and **rcon.password** need to match what you put in your **.env**.

After you've done all this, go ahead and run the server again:

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

# File Structure

- **server-wrapper**
  - **dist** *(Only locally)*: *All built files, ignored by git.*
  - **json** *(Only locally)*: *Minecraft server files, ignored by git.*
  - **logs** *(Only locally)*: *Minecraft server files, ignored by git.*
  - **node_modules** *(Only locally)*: *NPM package files, ignored by git.*
  - **src**: *Place all code in here, try to keep files in subdirectories*
    - **config**: *Static variables*
      - **index**: *Access environmental variables from .env and other constants.*
    - **minecraft-server**: *Code related to the minecraft server.*
      - **index.ts**: *Aids in the instantiation of the script server.*
      - **helpers**: *Additional helper functions.*
        - **active-players.ts**: *Cache method for tracking player activity.*
      - **responses**: *Responses to minecraft events.*
        - **achievement.ts**: *Response to player getting an achievement in minecraft.*
        - **chat.ts**: *Response to player sending a chat in minecraft.*
        - **index.ts**: *Exports minecraft responses.*
        - **login.ts**: *Response to player login in minecraft.*
        - **logout.ts**: *Response to player logout in minecraft.*
        - **response.ts**: *Base minecraft response class.*
    - **web-socket**: *Code related to the web-socket server.*
      - **index.ts**: *Aids in the instantiation of the websocket server.*
      - **responses**: *Responses to websocket events.*
        - **command.ts**: *Response to discord bot issuing a minecraft command.*
        - **index.ts**: *Exports websocket responses.*
        - **player-position.ts**: *Response to discord bot querying for a player's position.*
        - **response.ts**: *Base websocket response class.*
        - **status.ts**: *Response to discord bot querying for server online status.*
    - **index.ts**: *Starts the server, first file run.*
    - **server.ts**: *Defines the server and interactions between the minecraft server and web-socket*
  - **tests**: *Tests for server.*
    - **integration**: *Tests for end to end testing.*
    - **unit**: *Tests for single components, match up with file names in src.*
    - **utils**: *Additional utilities for testing.*
      - **mock-minecraft-server.ts**: *Mocks ScriptServer with empty class with identical interface.*
      - **mock-web-socket-server.ts**: *Mocks WebSocketServer with empty class with identical interface.*
  - **world** *(Only locally)*: *Minecraft server files, ignored by git.*
  - **.env** *(Only locally)*: *Stores secrets and environmental variables, ignored by git.*
  - **.gitignore** *Ignores files from being uploaded to git.*
  - **banned-ips.json** *(Only locally)*: *Minecraft server files, ignored by git.*
  - **banned-players.json** *(Only locally)*: *Minecraft server files, ignored by git.*
  - **eula** *(Only locally)*: *Minecraft server files, ignored by git.*
  - **example.env** *Example of a .env, create a .env and copy the contents of this file into it.*
  - **ops.json** *(Only locally)*: *Minecraft server files, ignored by git.*
  - **package-lock.json** *Keeps track of NPM package versions.*
  - **package.json** *Keeps track of NPM package dependencies and scripts such as "npm run start".*
  - **README.md** *Documentation*
  - **server.jar** *(Only locally)*: *Minecraft server files, ignored by git.*
  - **server.properties** *(Only locally)*: *Minecraft server files, ignored by git.*
  - **tsconfig.json** *Tells Typescript how to build our code.*
  - **usercache.json** *(Only locally)*: *Minecraft server files, ignored by git.*
  - **whitelist.json** *(Only locally)*: *Minecraft server files, ignored by git.*

# Tasks

- [ ] Websocket authentication, ensure the only connection the discord bot can recieve is the discord bot.
- [ ] When the server has a new output, the server should send that output to the discord bot.

# References

- [websocket](https://github.com/theturtle32/WebSocket-Node/blob/HEAD/docs/index.md)
- [scriptserver](https://github.com/garrettjoecox/scriptserver)
- [scriptserver/core](https://github.com/garrettjoecox/scriptserver/tree/master/packages/core)
- [scriptserver/event](https://github.com/garrettjoecox/scriptserver/tree/master/packages/event)
- [scriptserver/util](https://github.com/garrettjoecox/scriptserver/tree/master/packages/util)
- [scriptserver/command](https://github.com/garrettjoecox/scriptserver/tree/master/packages/command)
- [scriptserver/essentials](https://github.com/garrettjoecox/scriptserver/tree/master/packages/essentials)
