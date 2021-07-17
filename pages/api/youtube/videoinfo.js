import ytdl from "ytdl-core";
import XMLHttpRequest from "xmlhttprequest";
import https from "https";

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const getFileSize = (url, callback) => {
  // if (typeof callback == "function") {
  //   let newData = arrJson;
  //   newData.push(data);
  //   return newData;
  // }
  let fileSize = 0;
  let http = new XMLHttpRequest.XMLHttpRequest();
  http.open("HEAD", url, true); // true = Asynchronous
  http.onreadystatechange = function () {
    if (this.readyState == this.DONE) {
      if (this.status === 200) {
        callback(parseInt(this.getResponseHeader("content-length")));
      }
    }
  };
  http.send();
};

export default async function handler(req, res) {
  let start = new Date();
  let hrstart = process.hrtime();
  const videoURL = req.query.videoURL;
  // const info = await ytdl.getInfo(videoURL);

  // const info = await ytdl.getInfo(videoURL);
  // let filteredVideo = [];

  // for (let i = 0; i < info.formats.length; i++) {
  //   if (info.formats[i].container != "mp4") {
  //     continue;
  //   }
  //   // if (info.formats[i].audioCodec == null) {
  //   //   continue;
  //   // }
  //   if (!info.formats[i].hasAudio) {
  //     continue;
  //   }
  //   // filteredVideo.push(info.formats[i]);
  //   let fileSize = 0;
  //   let xmlreq = new XMLHttpRequest.XMLHttpRequest();
  //   xmlreq.open("HEAD", info.formats[i].url, false); // false = Synchronous

  //   xmlreq.send(null); // it will stop here until this xmlreq request is complete

  //   // when we are here, we already have a response, b/c we used Synchronous XHR

  //   if (xmlreq.status === 200) {
  //     fileSize = xmlreq.getResponseHeader("content-length");
  //     info.formats[i].totalSize = formatBytes(fileSize);
  //     info.formats[i].fullSize = parseInt(fileSize);
  //     filteredVideo.push(info.formats[i]);
  //   }
  // }

  // info.filteredVideo = filteredVideo;
  // let end = new Date() - start;
  // let hrend = process.hrtime(hrstart);
  // console.info("Execution time: %dms", end);
  // console.info(
  //   "Execution time (hr): %dms %dms",
  //   hrend[0] / 1000000,
  //   hrend[1] / 1000000
  // );

  // res.status(200).json(info);

  try {
    const info = await ytdl.getInfo(videoURL);
    let filteredVideo = [];

    for (let i = 0; i < info.formats.length; i++) {
      if (info.formats[i].container != "mp4") {
        continue;
      }
      // if (info.formats[i].audioCodec == null) {
      //   continue;
      // }
      if (!info.formats[i].hasAudio) {
        continue;
      }
      // filteredVideo.push(info.formats[i]);
      let fileSize = 0;
      let xmlreq = new XMLHttpRequest.XMLHttpRequest();
      xmlreq.open("HEAD", info.formats[i].url, false); // false = Synchronous

      xmlreq.send(null); // it will stop here until this xmlreq request is complete

      // when we are here, we already have a response, b/c we used Synchronous XHR

      if (xmlreq.status === 200) {
        fileSize = xmlreq.getResponseHeader("content-length");
        info.formats[i].totalSize = formatBytes(fileSize);
        info.formats[i].fullSize = parseInt(fileSize);
        filteredVideo.push(info.formats[i]);
      }
    }

    info.filteredVideo = filteredVideo;
    let end = new Date() - start;
    let hrend = process.hrtime(hrstart);
    console.info("Execution time: %dms", end);
    console.info(
      "Execution time (hr): %dms %dms",
      hrend[0] / 1000000,
      hrend[1] / 1000000
    );

    res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message:
        "Video URL not Valid, please make sure you copy the correct Youtube Video URL",
    });
  }

  // let filteredVideo = [];
}
