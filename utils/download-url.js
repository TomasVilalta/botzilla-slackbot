const fs = require("fs");
const https = require("https");
const IMAGES = require("../constants/images");
const util = require("util");
const pipeline = util.promisify(require("stream").pipeline);

const downloadUrl = async ({ url }) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Image will be stored at this path
      const path = `./temp/baseImage.jpg`;
      const filePath = fs.createWriteStream(path);

      pipeline(res, filePath)
        .then(() => {
          console.log("Downloaded Base Image");
          resolve();
        })
        .catch((err) => {
          console.error("Something went wrong while getting the base image!", err);
          reject(err);
        });
    });
  });
};

downloadUrl({ url: IMAGES[2] });

module.exports = downloadUrl;
