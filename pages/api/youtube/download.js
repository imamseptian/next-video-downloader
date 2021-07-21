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
    if (vid.qualityLabel === quality && vid.hasAudio) {
      return vid;
    }
  });

  // res.setHeader(
  //   "Content-Disposition",
  //   `attachment; filename="${videoTitle}.${mime}"`
  // );

  // ytdl(videoURL, {
  //   filter: (format) => format.itag == itag,
  // }).pipe(res);

  // let mytest = await axios.get(testUrl);
  // console.log(mytest.headers);
  let ayayaUrl =
    "https://r2---sn-q0c7rn76.googlevideo.com/videoplayback?expire=1626920028&ei=_H_4YLuUCIH1xN8P7bKR8A4&ip=34.240.194.196&id=o-ACPBKpyURJuUAlDtOd7ccMyzowV0eaCP-Bwr8Qu2ay2z&itag=18&source=youtube&requiressl=yes&mh=aL&mm=31%2C29&mn=sn-q0c7rn76%2Csn-q0cedn7s&ms=au%2Crdu&mv=m&mvi=2&pl=17&initcwndbps=781250&vprv=1&mime=video%2Fmp4&ns=KKaRBlfbz90AQxEmqSfv4vQG&gir=yes&clen=25753603&ratebypass=yes&dur=325.427&lmt=1544468288077985&mt=1626898150&fvip=2&fexp=24001373%2C24007246&c=WEB&txp=5531432&n=3XoQlVHjMro8Fjg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIhAJBsXgbMbZOu44uUkoEfqUyiSR4fZW2lEVJD1Z2CP-bBAiATX0Epm8VtXQGZhUTacawY0HxTYdxyHJg_o-T9V_jobQ%3D%3D&sig=AOq0QJ8wRgIhAPSFIMG3q9pPtX7WaRdCqpuAI0pg3dsjpXxJu17CtlpiAiEArkBhNrQ_VUHAMnR7wkt2qu81suROHRGH2GGo0qgBj6U%3D";

  console.log(req.body.testBody);
  return new Promise((resolve, reject) => {
    try {
      https.get(ayayaUrl, function (response) {
        let kepala = response.headers;
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${videoTitle}.mp4"`
        );
        res.setHeader("Content-length", kepala["content-length"]);
        res.setHeader("Content-type", kepala["content-type"]);
        response.pipe(res);
        resolve();
      });
    } catch (error) {
      res.json(error);
      res.status(405).end();
      return resolve();
    }
  });
}
