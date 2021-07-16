import https from "https";
// import TikTokScraper from "tiktok-scraper";
const TikTokScraper = require("tiktok-scraper");

const getTikTokInfo = async (url) => {
  try {
    const videoMeta = await TikTokScraper.getVideoMeta(
      url
      //   "https://www.tiktok.com/@tiktok/video/6807491984882765062"
      //   "https://www.tiktok.com/@arissetiady46/video/6982487753959296257"
    );
    // console.log(videoMeta);
    return videoMeta;
    // console.log("khonto");
  } catch (error) {
    console.log(error);
    console.log("tiktokerror");
    return {};
  }
};

export default async function download(req, res) {
  const videoURL = req.query.videoURL;
  console.log("before tiktok fetch");
  let requestHeader = await getTikTokInfo(videoURL);
  //   req.setHeader(requestHeader.headers);
  console.log(requestHeader);
  console.log(requestHeader.collector[0].videoUrl);

  let url = requestHeader.collector[0].videoUrl;
  let urlremoved = url.replace("https://", "");
  let arrword = urlremoved.split("/");

  let options = {
    hostname: arrword[0],
    path: urlremoved.replace(arrword[0], ""),
    headers: requestHeader.headers,
  };
  //   psl.get(extractHostname(url)); // returns youtube.com
  console.log(arrword[0]);
  console.log(urlremoved.replace(arrword[0], ""));
  console.log(options);
  //   res.json(requestHeader);
  let videoTitle = `${requestHeader.collector[0].authorMeta.name} - ${requestHeader.collector[0].text}`;
  videoTitle = videoTitle.replace(/[^a-z0-9 ,.#!-]/gi, "");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${videoTitle}.mp4"`
  );
  // res.json({
  //   name: videoTitle,
  // });
  //   const request = https.get(
  //     requestHeader.headers,
  //     requestHeader.collector[0].videoUrl,
  //     function (response) {
  //       response.pipe(res);
  //       resolve();
  //     }
  //   );

  return new Promise((resolve, reject) => {
    try {
      const request = https.get(options, function (response) {
        // console.log(response);
        response.pipe(res);
        resolve();
      });
    } catch (error) {
      console.log("error");
      console.log(error);
      res.json(error);
      res.status(405).end();
      return resolve();
    }
  });
}
