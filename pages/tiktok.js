import axios from "axios";
import { useEffect, useState } from "react";
import {
  Navbar,
  TikTokVideoDetails,
  Spinner,
  ErrorVideo,
  UrlField,
} from "../components";
import FileDownload from "js-file-download";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

  const downloadVideo = async () => {
    axios.defaults.withCredentials = true;
    // console.log(`${webUrl}api/tiktok/download?videoURL=${videoURL}`);
    // window.open(
    //   `${webUrl}api/tiktok/download?videoURL=${videoURL}&user=${videoInfo.headers["user-agent"]}&referer=${videoInfo.headers.referer}&cookie=${videoInfo.headers.cookie}`
    // );
    // try {
    //   let response = await axios.get(
    //     `${webUrl}api/tiktok/download?videoURL=${videoURL}&user=${videoInfo.headers["user-agent"]}&referer=${videoInfo.headers.referer}&cookie=${videoInfo.headers.cookie}`
    //   );
    // } catch (e) {
    //   console.log(e.message);
    // }
    axios({
      // url: `${webUrl}api/tiktok/download?videoURL=${videoURL}&user=${videoInfo.headers["user-agent"]}&referer=${videoInfo.headers.referer}&cookie=${videoInfo.headers.cookie}`,
      // url: videoInfo.collector[0].videoUrl,
      // url: `${webUrl}api/tiktok/download?videoURL=${videoURL}&user=${videoInfo.headers["user-agent"]}&referer=${videoInfo.headers.referer}&cookie=${videoInfo.headers.cookie}`,
      url: `${webUrl}api/tiktok/download?videoURL=${videoURL}`,
      method: "POST",
      responseType: "blob", // Important,
      // headers: customHeader,
      data: {
        headers: videoInfo.headers,
        url: videoInfo.collector[0].videoUrl,
        videoTitle: `${videoInfo.collector[0].authorMeta.name} - ${videoInfo.collector[0].text}`,
      },
    }).then((response) => {
      let videoTitle = `${videoInfo.collector[0].authorMeta.name} - ${videoInfo.collector[0].text}`;
      videoTitle = videoTitle.replace(/[^a-z0-9 ,.#!-]/gi, "");
      FileDownload(response.data, `${videoTitle}.mp4`);
      // console.log(response);
    });
    // .catch((error) => {
    //   console.log(error);
    //   console.log(videoInfo.collector[0].videoUrl);
    //   console.log(videoInfo.headers);
    // });
    // let response = await axios.get(
    //   `${webUrl}api/tiktok/download?videoURL=${videoURL}&user=${videoInfo.headers["user-agent"]}&referer=${videoInfo.headers.referer}&cookie=${videoInfo.headers.cookie}`,
    //   { withCredentials: true, headers: videoInfo.headers }
    // );
    // const axiosConfig = {
    //   headers: {
    //     "content-Type": "application/json",
    //     Accept: "/",
    //     "Cache-Control": "no-cache",
    //     Cookie: document.cookie,
    //   },
    //   credentials: "same-origin",
    // };
    // axios.defaults.withCredentials = true;
    // axios
    //   .get("/url", axiosConfig)
    //   .then((res) => {
    //     // Some result here
    //   })
    //   .catch((err) => {
    //     console.log(":(");
    //   });
  };

  const getVideoInfo = async () => {
    setisLoading(true);

    try {
      let response = await axios.get(
        `${webUrl}api/tiktok/videoinfo?videoURL=${videoURL}`
      );
      console.log(response.status);
      console.log(response.data);
      setErrorStatus({
        ...errorStatus,
        isError: false,
        message: "",
      });
      setVideoInfo(response.data);
      setisLoading(false);
    } catch (e) {
      console.log(e.message);
      setErrorStatus({
        ...errorStatus,
        isError: true,
        message: e.response.data.message,
      });
      setVideoInfo(null);
      setisLoading(false);
    }
  };

  const DetailVideo = () =>
    videoInfo !== null ? (
      <TikTokVideoDetails videoInfo={videoInfo} downloadVideo={downloadVideo} />
    ) : null;

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <div className="title-section-wrapper">
          <h1 style={{ marginRight: "15px" }}>Tiktok Video Downloader </h1>
          <FontAwesomeIcon icon={["fab", "tiktok"]} size="2x" />
        </div>

        <UrlField
          urlChange={setVideoURL}
          getVideo={getVideoInfo}
          videoURL={videoURL}
          logo="tiktok"
          placeholder="Paste a TikTok video URL here"
        />
        {/* <p>{JSON.stringify(videoInfo.headers)}</p> */}

        {/* detail video  */}
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
