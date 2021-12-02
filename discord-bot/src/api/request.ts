// Packages
import axios from 'axios';

export const request = axios.create({
    baseURL: 'https://discord.com/api/v9',
    headers: {
        'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
    },
});
