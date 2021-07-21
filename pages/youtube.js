import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Navbar,
  Spinner,
  VerticalVideoDetails,
  UrlField,
  ErrorVideo,
} from "../components";
import FileDownload from "js-file-download";

export default function TikTok() {
  const webUrl = process.env.BASE_URL;
  // const webUrl = "http://localhost:3000/";

  const [videoInfo, setVideoInfo] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState({
    isError: false,
    message: "",
  });

  const downloadVideo = (url, itag, quality) => {
    let mime = "mp4";
    let qual = quality;
    if (quality == null) {
      mime = "mp3";
      let qual = "music";
    }
    console.log(
      `${webUrl}api/youtube/download?videoURL=${videoURL}&quality=${qual}`
    );

    window.open(
      // `${webUrl}api/youtube/download?videoURL=${videoURL}&selectedURL=${url}&itag=${itag}&mime=${mime}`
      `${webUrl}api/youtube/download?videoURL=${videoURL}&quality=${qual}`
    );
    // axios({
    //   // url: `${webUrl}api/tiktok/download?videoURL=${videoURL}&user=${videoInfo.headers["user-agent"]}&referer=${videoInfo.headers.referer}&cookie=${videoInfo.headers.cookie}`,
    //   // url: videoInfo.collector[0].videoUrl,
    //   // url: `${webUrl}api/tiktok/download?videoURL=${videoURL}&user=${videoInfo.headers["user-agent"]}&referer=${videoInfo.headers.referer}&cookie=${videoInfo.headers.cookie}`,
    //   url: `${webUrl}api/youtube/downloadpost`,
    //   method: "POST",
    //   responseType: "blob", // Important,
    //   // headers: customHeader,
    //   data: {
    //     downloadlink:
    //       "https://r1---sn-htgx20capjpq-ngbe.googlevideo.com/videoplayback?expire=1626923226&ei=eoz4YOTFHb_X3LUPncCGgAg&ip=103.120.173.83&id=o-ACmFkhgaHzhnXa3C9mJzeGgR8QqSHckYiPHHbvb1qYHG&itag=18&source=youtube&requiressl=yes&mh=zg&mm=31%2C29&mn=sn-htgx20capjpq-ngbe%2Csn-htgx20capjpq-jb3l&ms=au%2Crdu&mv=m&mvi=1&pcm2cms=yes&pl=24&initcwndbps=493750&vprv=1&mime=video%2Fmp4&ns=Vc6a-gM73V9awEkPmYacL2wG&gir=yes&clen=1777179&ratebypass=yes&dur=36.107&lmt=1626181377530186&mt=1626901024&fvip=8&fexp=24001373%2C24007246&c=WEB&txp=5310224&n=QKR91nw_c6tg6Ru&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgAlVecmXO4Y2kfn3Z657QddAfDotcYUUbEjjkKV70RGoCIAzl4gXtfR4Rr9J88NGAqYcl1fQEFMaY35APxmBUWXaI&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAKz5Fqjrm-vwW23WqiFz6EntTAFpPA8ZrnhqnXxbed_0AiEAn6se_vX-3UtefYQ2XsFRAqYPhehm-lY1eThlc6JJZPo%3D",
    //   },
    // }).then((response) => {
    //   FileDownload(response.data, `${`makar`}.mp4`);
    //   // console.log(response);
    // });
  };

  const getVideoInfo = async () => {
    setErrorStatus({
      ...errorStatus,
      isError: false,
      message: "",
    });
    setVideoInfo(null);
    setisLoading(true);
    try {
      let response = await axios.get(
        `${webUrl}api/youtube/videoinfo?videoURL=${videoURL}`
      );
      let data = response.data;
      // let orderedSize = data.filteredVideo;
      // orderedSize = orderedSize.sort((a, b) =>
      //   a.fullSize > b.fullSize ? 1 : -1
      // );

      setVideoList(data.filteredVideo);
      // setVideoList(orderedSize);
      console.log(data);
      setVideoInfo(data);
      setisLoading(false);
    } catch (e) {
      console.log(e.message);
      setErrorStatus({
        ...errorStatus,
        isError: true,
        message: "e.response.data.message",
      });
      setVideoInfo(null);
      setisLoading(false);
    }
  };

  const DetailVideo = () =>
    videoInfo !== null ? (
      <VerticalVideoDetails
        videoURL={videoURL}
        videoInfo={videoInfo}
        videoList={videoList}
        downloadFunction={downloadVideo}
      />
    ) : null;

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <div className="title-section-wrapper">
          <h1 className="page-title">YouTube Video Downloader </h1>
          <FontAwesomeIcon icon={["fab", "youtube"]} size="2x" />
        </div>

        <UrlField
          urlChange={setVideoURL}
          getVideo={getVideoInfo}
          videoURL={videoURL}
          logo="youtube"
          placeholder="Paste a Youtube video URL here"
        />

        {!isLoading ? <DetailVideo /> : <Spinner />}
        <ErrorVideo
          errorStatus={errorStatus}
          dismissAlert={() => {
            setErrorStatus({
              ...errorStatus,
              isError: false,
              message: "",
            });
          }}
        />
      </div>
    </div>
  );
}
