import ytdl from "ytdl-core";

export default async function download(req, res) {
  const videoURL = req.query.videoURL;
  const mime = req.query.mime;
  const info = await ytdl.getInfo(videoURL);

  const itag = req.query.itag;
  let videoTitle = info.videoDetails.title;
  videoTitle = videoTitle.replace(/[^a-z0-9 ,.!-]/gi, "");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${videoTitle}.${mime}"`
    // `attachment; filename="kontolodon.${mime}"`
  );
  ytdl(videoURL, {
    filter: (format) => format.itag == itag,
  }).pipe(res);
}
