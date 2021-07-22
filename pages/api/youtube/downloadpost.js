import ytdl from "ytdl-core";
import https from "https";

export default async function download(req, res) {
  if (req.method == "POST") {
    let downloadlink = req.body.downloadlink;
    console.log(req.body);

    let url =
      "https://cdn.pixabay.com/photo/2021/07/15/10/47/cat-6468112_960_720.jpg";

    return new Promise((resolve, reject) => {
      try {
        https.get(url, function (response) {
          let kepala = response.headers;
          res.setHeader(
            "Content-Disposition",
            `attachment; filename="imageku.jpg"`
          );
          res.setHeader("Content-length", kepala["content-length"]);
          res.setHeader("Content-type", kepala["content-type"]);
          response.pipe(res);
          resolve();
        });
      } catch (error) {
        res.json({ message: error });
        res.status(405).end();
        return resolve();
      }
    });
  }
  if (req.method == "GET") {
    const videoURL = req.query.downloadlink;
    console.log(videoURL);

    let url =
      "https://cdn.pixabay.com/photo/2021/07/15/10/47/cat-6468112_960_720.jpg";

    return new Promise((resolve, reject) => {
      try {
        https.get(url, function (response) {
          let kepala = response.headers;
          res.setHeader(
            "Content-Disposition",
            `attachment; filename="imageku.jpg"`
          );
          res.setHeader("Content-length", kepala["content-length"]);
          res.setHeader("Content-type", kepala["content-type"]);
          response.pipe(res);
          resolve();
        });
      } catch (error) {
        res.json({ message: error });
        res.status(405).end();
        return resolve();
      }
    });
  }

  // ytdl(videoURL, {
  //   filter: (format) => format.itag == itag,
  // }).pipe(res);

  // let mytest = await axios.get(testUrl);
  // console.log(mytest.headers);
  // return new Promise((resolve, reject) => {
  //   try {
  //     https.get(downloadlink, function (response) {
  //       let kepala = response.headers;
  //       res.setHeader("Content-Disposition", `attachment; filename="asu.mp4"`);
  //       res.setHeader("Content-length", kepala["content-length"]);
  //       res.setHeader("Content-type", kepala["content-type"]);
  //       response.pipe(res);
  //       resolve();
  //     });
  //   } catch (error) {
  //     res.json(error);
  //     res.status(405).end();
  //     return resolve();
  //   }
  // });
}
