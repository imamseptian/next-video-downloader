import ytdl from "ytdl-core";
import https from "https";
import axios from "axios";

export default async function download(req, res) {
  const videoURL = req.query.videoURL;
  const quality = req.query.quality;
  // const mime = req.query.mime;
  const info = await ytdl.getInfo(videoURL);

  const itag = req.query.itag;
  let videoTitle = info.videoDetails.title;
  videoTitle = videoTitle.replace(/[^a-z0-9 ,.!-]/gi, "");

  let selectedVideo = info.formats.filter((vid) => {
    // console.log(vid);
    if (vid.qualityLabel === quality && vid.hasAudio) {
      // console.log(vid);
      return vid;
    }
  });
  console.log(selectedVideo[0]);
  // res.setHeader(
  //   "Content-Disposition",
  //   `attachment; filename="${videoTitle}.${mime}"`
  // );

  // ytdl(videoURL, {
  //   filter: (format) => format.itag == itag,
  // }).pipe(res);

  // let mytest = await axios.get(testUrl);
  // console.log(mytest.headers);
  // res.json({ asu: "asu" });
  return new Promise((resolve, reject) => {
    try {
      console.log("try cath");
      const request = https.get(selectedVideo[0].url, function (response) {
        let kepala = response.headers;
        // console.log(kepala["content-length"]);
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${videoTitle}.mp4"`
        );
        res.setHeader("Content-length", kepala["content-length"]);
        res.setHeader("Content-type", kepala["content-type"]);
        response.pipe(res);
        // res.download(response);
        // res.json({ ayaya: JSON.stringify(response) });
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
