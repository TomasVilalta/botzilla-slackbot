const { App } = require("@slack/bolt");
const IMAGES = require("./constants/images.js");
const createImage = require("./utils/createImage.js");
const fs = require("fs");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000,
});

// Listens to incoming messages that contain "hello"
app.message("hello", async ({ message, say }) => {
  const messageImage = IMAGES[Math.floor(Math.random() * IMAGES.length)];

  await say({
    text: `Hello, <@${message.ts}>!`,
    thread_ts: message.ts,
    blocks: [
      {
        type: "section",
        text: {
          type: "plain_text",
          text: "Deaaaa ",
          emoji: true,
        },
      },
      {
        type: "image",
        title: {
          type: "plain_text",
          text: "I love tacos",
          emoji: true,
        },
        image_url: messageImage,
        alt_text: "delicious tacos",
      },
    ],
  });
});

const uploadImage = async (channel, image) => {
  try {
    await app.client.files.upload({
      token: process.env.SLACK_BOT_TOKEN,
      channels: channel,
      file: image,
      initial_comment: "pepe",
    });
  } catch (e) {
    console.log(e);
  }
};

app.message("pepe", async ({ message, say }) => {
  const messageImage = await IMAGES[Math.floor(Math.random() * IMAGES.length)];
  const image = await createImage({ phrase: "saracatunga", baseImage: messageImage });
  await app.client.files.upload({
    token: process.env.SLACK_BOT_TOKEN,
    channels: message.channel,
    file: fs.ReadStream(image),
    initial_comment: "pepe",
  });
});

(async () => {
  // Start your app
  await app.start();

  console.log("⚡️ Bolt app is running!");
})();
