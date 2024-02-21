const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const { formatTitle } = require("./format-title");
const downloadUrl = require("./download-url");
const IMAGES = require("../constants/images");

const createImage = async ({ phrase, baseImage }) => {
  const { createCanvas } = require("canvas");
  const fs = require("fs");
  await downloadUrl({ url: baseImage });

  const text = formatTitle(phrase || "Saracatunga 2021");

  // Dimensions for the image
  const width = 1200;
  const height = 1200;
  const centerPoint = {
    x: width / 2,
    y: height / 2,
  };
  const titleY = height - 200;
  const lineHeight = 100;

  const imagePosition = {
    w: 1200,
    h: 1200,
    x: 0,
    y: 0,
  };

  // Instantiate the canvas object
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Fill the rectangle with purple
  context.fillStyle = "#0b0b0b";
  context.fillRect(0, 0, width, height);

  const image = await loadImage("./baseImage.jpg");
  const { w, h, x, y } = imagePosition;
  context.drawImage(image, x, y, w, h);

  // Set the style of the text and render it to the canvas
  context.font = "bold 70pt 'Sans'";
  context.textAlign = "center";
  context.fillStyle = "#fff";
  context.shadowColor = "rgba(0, 0, 0, 1)"; // Shadow color
  context.shadowBlur = 5; // Shadow blur radius
  context.shadowOffsetX = 5; // Shadow offset along the x-axis

  // Render the text with shadow
  context.fillText(text[0], 600, titleY);
  if (text[1]) context.fillText(text[1], 600, titleY + lineHeight);

  const buffer = canvas.toBuffer("image/jpeg"); // Its jpeg or png, so jpeg it is
  fs.writeFileSync("./masterPiece.jpg", buffer);

  return "./masterPiece.jpg";
};

//test
// createImage({ phrase: "saracatunga", baseImage: IMAGES[0] });

module.exports = createImage;
