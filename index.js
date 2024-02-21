const { App } = require("@slack/bolt");
const IMAGES = require("./constants/images.js");
const createImage = require("./services/createImage.js");
const fs = require("fs");
const getRandomMessage = require("./utils/dailyMessageProvider.js");
const { get } = require("http");
const getTodayQuote = require("./services/quotesServiceProvider.js");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

app.message("Buenas", async ({ message, say }) => {
  const messageImage = await IMAGES[Math.floor(Math.random() * IMAGES.length)];
  const quote = await getTodayQuote();
  const image = await createImage({ phrase: quote, baseImage: messageImage });
  const text = getRandomMessage();
  await app.client.files.upload({
    token: process.env.SLACK_BOT_TOKEN,
    channels: message.channel,
    file: fs.ReadStream(image),
    initial_comment: text,
  });
});

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
