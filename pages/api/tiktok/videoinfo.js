const TikTokScraper = require("tiktok-scraper");

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

export default async function sendInfo(req, res) {
  const videoURL = req.query.videoURL;
  console.log(videoURL);
  // let requestHeader = await getTikTokInfo(videoURL);
  try {
    const videoMeta = await TikTokScraper.getVideoMeta(videoURL);
    res.status(200).json(videoMeta);
  } catch (error) {
    console.log("tiktokerror");
    res
      .status(404)
      .json({
        message:
          "Video URL not Valid, please make sure you copy the correct TikTok Video URL",
      });
    // res.json;
  }
  //   req.setHeader(requestHeader.headers);
  // console.log(requestHeader);
  //   console.log(requestHeader.collector[0].videoUrl);
}
