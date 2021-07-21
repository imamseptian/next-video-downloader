import { type } from "os";

const TikTokScraper = require("tiktok-scraper");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile);

const getTikTokInfo = async (url) => {
  try {
    const videoMeta = await TikTokScraper.getVideoMeta(url);
    // console.log(videoMeta);
    return videoMeta;
    // console.log("khonto");
  } catch (error) {
    console.log(error);
    console.log("tiktokerror");
    return {};
  }
};

const readProxy = async () => {
  fs.readFile("proxy.txt", function (err, data) {
    if (err) throw err;
    // console.log(data);
    console.log(typeof data.toString());
    return data.toString();
  });
};
function getStuff() {
  return readFile("proxy.txt");
}

export default async function sendInfo(req, res) {
  const videoURL = req.query.videoURL;
  console.log(videoURL);
  // let requestHeader = await getTikTokInfo(videoURL);
  getStuff().then((data) => {
    console.log(data);
  });
  fs.readFile("proxy.txt", async function (err, data) {
    // if (err) throw err;
    // // console.log(data);
    // console.log(typeof data.toString());
    // return data.toString();
    // console.log(data.toString());
    let ayaya = data.toString();
    let proxyArr = ayaya.split("\r\n");
    // console.log(proxyArr);

    try {
      const videoMeta = await TikTokScraper.getVideoMeta(videoURL, {
        // SET PROXY HERE , IF U WANT USE MORE THAN ONE JUST REPLACE IT WITH ARRAY OF PROXY
        proxy: "80.95.113.148:8080",
        // proxy: "157.25.200.39:8080",
      });

      // const videoMeta = await TikTokScraper.getVideoMeta(videoURL);
      console.log(videoMeta.headers);

      res.status(200).json(videoMeta);
    } catch (error) {
      console.log(error);
      if (error == "Cannot read property 'split' of undefined") {
        res.status(404).json({
          message:
            "Video URL not Valid, please make sure you copy the correct TikTok Video URL",
        });
      } else {
        res.status(500).json({
          message: "Internal Server Error, please try again later",
        });
      }

      // res.json;
    }
  });
  // try {
  //   const videoMeta = await TikTokScraper.getVideoMeta(videoURL);
  //   res.status(200).json(videoMeta);
  // } catch (error) {
  //   console.log(error);
  //   if (error == "Cannot read property 'split' of undefined") {
  //     res.status(404).json({
  //       message:
  //         "Video URL not Valid, please make sure you copy the correct TikTok Video URL",
  //     });
  //     // res.status(500).json({
  //     //   message: "Internal Server Error, please try again later",
  //     // });
  //   } else {
  //     res.status(500).json({
  //       message: "Internal Server Error, please try again later",
  //     });
  //   }

  //   // res.json;
  // }
  //   req.setHeader(requestHeader.headers);
  // console.log(requestHeader);
  //   console.log(requestHeader.collector[0].videoUrl);
}

// , {
//   // SET PROXY HERE , IF U WANT USE MORE THAN ONE JUST REPLACE IT WITH ARRAY OF PROXY
//   proxy: "78.186.111.152:9090",
// }

// , {
//   // SET PROXY HERE , IF U WANT USE MORE THAN ONE JUST REPLACE IT WITH ARRAY OF PROXY
//   proxy: proxyArr,
// }
