import ytdl from "ytdl-core";
import https from "https";
import axios from "axios";

export default async function download(req, res) {
  let downloadlink = req.body.downloadlink;

  // ytdl(videoURL, {
  //   filter: (format) => format.itag == itag,
  // }).pipe(res);

  // let mytest = await axios.get(testUrl);
  // console.log(mytest.headers);
  return new Promise((resolve, reject) => {
    try {
      https.get(downloadlink, function (response) {
        let kepala = response.headers;
        res.setHeader("Content-Disposition", `attachment; filename="asu.mp4"`);
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
