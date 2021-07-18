import https from "https";

export default async function download(req, res) {
  const videoURL = req.query.videoURL;
  let videoTitle = req.query.title;
  videoTitle = videoTitle.replace(/[^a-z0-9 ,.!-]/gi, "");

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${videoTitle}.mp4"`
  );

  return new Promise((resolve, reject) => {
    try {
      const request = https.get(videoURL, function (response) {
        let kepala = response.headers;
        // console.log(response);
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
