import { Client, middleware as lineMiddleware } from '@line/bot-sdk';

const config = {
  channelAccessToken: process.env.LINE_BOT_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_BOT_CHANNEL_SECRET
}
const client = new Client(config);
export default client

export const linebotMiddleware = lineMiddleware(config)