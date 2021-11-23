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
DISCORD_BOT_TOKEN=
DATABASE_TYPE= // mongodb, cache, discord, 
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
